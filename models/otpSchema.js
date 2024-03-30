const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
  
    otp:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    time:{
        type:Date,
        required:true
    }
});
const otp=new mongoose.model("Otp",userSchema);
module.exports=otp
