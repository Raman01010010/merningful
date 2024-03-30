const mongoose=require("mongoose");
require("dotenv").config();
const DB=process.env.DB
mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>
    console.log("MongoDb connection started")).catch((error)=>console.log(error.message));

