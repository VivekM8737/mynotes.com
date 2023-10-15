const express = require('express');
const User = require('../models/User');
const authT=require('./key')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
let jwt = require('jsonwebtoken');
const fetchdata = require('../middleware/fetchdata');
const app = express();
const jwtSecString = authT.secretKey
router.post('/createUser',
    [
        body('name', 'Enter the valid name').escape(),
        body('email', 'Enter the valid email').isEmail().withMessage('Enter a valid and unique email').escape(),
        body('password', 'Enter the valid password').escape(),
        // body('conpassword', 'Enter match password').escape()
    ], async (req, res) => {
        let success=false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(404).json({ errors: errors.array() });
        }
        // here checking that email is already exist or not!!
        try {
            // here I tried to check the confirmation password is same or not? but now I handle it at front end level
            // let pass= req.body.password;
            // let conf= req.body.conpassword;
            // if(pass!==conf){
            //     return res.status(404).json({success, errors: "Please enter the same password in passward and confirm password collumn" });
            // }

            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(404).json({success, errors: "Email is aready exist" });
            }
            let salt = await bcryptjs.genSalt(10);
            let secPassword = await bcryptjs.hash(req.body.password, salt)
            // here initialize the user with valid name and email pass...
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPassword,
            })
                .catch(err => res.json({success, errors: "Error", message: err.message }));
            const data = {
                user: {
                    id: user.id
                }
            }
            // here we are creating jsonwebtoken for safe our user date jwt check the manipulation of request
            const authtoken = jwt.sign(data, jwtSecString);
            success=true;
            res.json({ success,authtoken })
        }
        catch (error) {
            console.error(error)
            res.status(500).json({success, error: "Internal server error!!" })
        }
    })

// here router 2nd is start which is helping in login with all security
router.post('/loginUser',
    [
        body('email', 'Enter the valid email').escape(),
        body('password', 'Enter the valid password').escape(),
    ], async (req, res) =>
     { let success=false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            success=false
            return res.status(404).json({ errors: errors.array() });
        }
        // here checking that email and passoword are same are not !!
        const {email , password} =req.body;
        try {
            let user = await User.findOne({email});
            if (!user) {
                success=false
                // return if email is worng or user don't exist
                return res.status(404).json({success, errors: "Please enter the valid email id and password!!" });
            }
            let passwordCompare = await bcryptjs.compare(password, user.password);
            if (!passwordCompare) {
                // if password is not match then this error is shown
                return res.status(404).json({success, errors: "Please enter the valid email id and password!!" });
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            try {
                
                const authtoken = jwt.sign(data, jwtSecString);
                success=true
                res.json({success,authtoken })
            } catch (error) {
                res.status(404).json({success, errors: "Please enter the valid email id and password!!" });
                
            }

        }
        catch (error) {
            console.error(error)
            res.status(500).json({success, error: "Internal server error!" })
        }

    })
    router.post("/getUser", fetchdata, async(req, res) =>{
        try {
            userId=req.user.id;
            const user = await User.findById(userId).select("-password");
            res.send(user);
        } catch (error) {
            console.error(error)
            res.status(500).send({ error: "Internal server error!" })
        }
    })
module.exports = router
