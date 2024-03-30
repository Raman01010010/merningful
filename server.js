const bodyParser=require("body-parser")
const express=require("express")
const cors=require("cors")
const sendEmail=require("./utils/sendEmail")
const otp=require("./models/otpSchema")
const app=express()
app.use(bodyParser.json())

const router=require('./routes/routes')
app.use(express.json())
app.use(cors())
const PORT=5000

const conn=require('./db/conn.js')
app.use(router)
app.post("/otp",async(req,res)=>{
    const d=new Date()
   const {email}=req.body
   otp5=Math.floor(100000 + Math.random() * 900000)
    const otp1=new otp({
        otp:otp5,email:email,time:d
    
       })
      
   const otp2=await otp.find({email:email})
   console.log(otp2)
   if(otp2.length){
    
    const upd=await otp.updateOne({email:email},{$set:{otp:otp5,time:d}});

    await sendEmail("",otp5,email,"",email)

    res.status(200).send("otp updated")
    console.log("updated")
   }else{
    try {
        
      
            await otp1.save();
            await sendEmail("",otp5,email,"",email)
            console.log("success")
            res.status(200).send("otp created")

        }catch(error){
            console.log(error)
            res.status(404).send("Error otp creation")
        }
    }
    
})
app.post("/cOtp",async(req,res)=>{
    const {otp5,email}=req.body
    try{
    const otp3=await otp.find({otp:otp5,email:email})

   
    if(otp3.length>0){
    const interval=((new Date())-otp3[0].time)/60000
    console.log(interval)
    if(interval>3){
        console.log("Otp expired")
        res.status(200).send("otp expired")
    }
    else{
        console.log("otp accepted")
        



        




        res.status(200).send("otp accepted")

    }}
    else{
        console.log("wrong otp")
        res.status(404).send("wrong otp")
    }

    console.log(otp3)}
    catch(error){
        console.log(error)
    }

})

app.post("/send",async(req,res)=>{
const {email}=req.body
    try{
        const send_to="rmnprjrrr@gmail.com"
        const send_from="rmnprj@outlook.com"
        const reply_to="rmnprjrrr#gmail.com"
        const subject="hello raman"
        const message=`<h3>Hello how are you</h3> <p>Regards</p>`

      
        await sendEmail(subject,message,send_to,send_from,reply_to)

        res.status(200).json({success:true})
        console.log("sent")
    }catch(error){
        console.log("error")
        res.status(404).json({success:false})

    }
})
app.listen(PORT,()=>{
    console.log("Server running on port 3000")
    console.log(Math.floor(100000 + Math.random() * 900000));
})