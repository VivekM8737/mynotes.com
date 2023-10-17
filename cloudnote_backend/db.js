const mongoose=require('mongoose')
require("dotenv").config(); 
const url = process.env.MONGO_URL
console.log(url)
const mongooseURI='mongodb://0.0.0.0:27017/cloudnotebook';
 const conectToMongo=()=>{
    mongoose.connect(mongooseURI)
    .then(()=>{console.log("conencted Successfully!")})
    .catch((err)=>{console.error(err)});
 }
module.exports=conectToMongo;