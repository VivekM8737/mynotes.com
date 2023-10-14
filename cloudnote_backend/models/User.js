const mongoose=require('mongoose');
const UserSchemas = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        validate(value) {
            if (value.length < 4 ) {
              throw new Error (
                "Please Enter vailid name which have atleast 4 character"
              );
            }
        },
        
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        validate(value) {
          if (!value.match(/\d/) || !value.match(/[a-zA-Z]/) ) {
            throw new Error(
              "Password must contain at least one letter and one number"
            );
          }
          else if(value.length < 8) {
            throw new Error (
              "Minimum length is 8 characters"
            );
          }
        },
      
    }
});
const User=mongoose.model('user',UserSchemas);
module.exports= User;