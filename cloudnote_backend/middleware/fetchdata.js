let jwt = require('jsonwebtoken');
const authT= require('../routes/key.js')
const jwtSecString = authT.secretKey
const fetchdata =(req,res, next) =>{
    const token = req.header('auth-tocken');
    if(!token){
        return res.status(401).send({ error: "Access Denied!!!" })
    }
    try {
        const data= jwt.verify(token, jwtSecString);
        req.user=data.user
        
    } catch (error) {
        return res.status(401).send({ error: "Access Denied!!" })
    }
    next();
}

module.exports= fetchdata;