const express= require('express');
const Note = require('../models/Note');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchdata = require('../middleware/fetchdata');
// router 1 which gives you all notes saved by user
router.get('/getNotes',fetchdata, async(req,res)=>{
    try {
        
        const notes= await Note.find({user: req.user.id})
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: "Internal server error!" })
    }
})
//router 2 here we adding note by geting from user...
router.post('/addnote',fetchdata,[
    body('name', 'Enter the valid name').escape(),
    body('description', 'Enter the valid description').escape(),
    body('tag', 'Enter the valid tag').escape(),], async(req , res)=>{
// takking title, description and tag from body 
    const {title,description,tag}=req.body;    
    const errors=validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
    }
    try {
        // inserting in database and saved it..
        const note = new Note({
            title, description,tag, user: req.user.id
        })
        const savenote= await note.save();
        res.json(savenote);
    } catch (error) {
        res.status(500).json({errors: "Internal server error!"})
    }

})
router.put('/udatenote/:id' ,fetchdata, async(req,res)=>{
    try {
        
        const {title, description, tag}=req.body;
        const newnote={};
        if(title){newnote.title=title}
        if(description){newnote.description=description}
        if(tag){newnote.tag=tag}
        
        let note=await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found")
        }
        note=await Note.findByIdAndUpdate(req.params.id,{$set: newnote},{new:true});
        res.json(note)
    } catch (error) {
        return res.status(500).send("Internal severdown")
    }
})
router.delete('/noteDelete/:id' ,fetchdata, async(req,res)=>{
    // const {title, description, tag}=req.body;
    try {
        let note=await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found")
        }
        note=await Note.findByIdAndDelete(req.params.id);
        res.json({"Delete":"The note is deleted sucessfully",note: note})
        
    } catch (error) {
        return res.status(500).send("Internal severdown")
    }    
})

module.exports=router