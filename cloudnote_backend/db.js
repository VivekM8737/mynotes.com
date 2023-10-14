const mongoose=require('mongoose')

const mongooseURI='mongodb://0.0.0.0:27017/cloudnotebook';
 const conectToMongo=()=>{
    mongoose.connect(mongooseURI)
    .then(()=>{console.log("conencted Successfully!")})
    .catch((err)=>{console.error(err)});
 }
module.exports=conectToMongo;