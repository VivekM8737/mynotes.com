const mongoose=require('mongoose')
require("dotenv").config(); 
const url = process.env.MONGO_URL
console.log(url)
const mongooseURI=url;
 const conectToMongo=()=>{
    mongoose.connect(mongooseURI)
    .then(()=>{console.log("conencted Successfully!")})
    .catch((err)=>{console.error(err)});
 }
module.exports=conectToMongo;