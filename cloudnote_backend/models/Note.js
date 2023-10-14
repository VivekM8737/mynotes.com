const mongoose=require('mongoose')
const UserNotes = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    title:{
        type: String,
        required: true,
        validate(value) {
            if (value.length < 3 ) {
              throw new Error (
                "Please Enter vailid name which have atleast 3 character"
              );
            }
        },
    },
    description:{
        type: String,
        required: true,
        validate(value) {
            if (value.length < 6 ) {
              throw new Error (
                "Please Enter vailid name which have atleast 6 character"
              );
            }
        },
    },
    tag:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
});
module.exports= mongoose.model('note',UserNotes)