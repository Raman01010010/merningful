const express = require('express');
const router = express.Router()
const users = require('../models/userSchema')
const posts = require('../models/postSchema')
const messages= require('../models/messageSchema')
var validator = require("email-validator");
const feed1=require("../models/feedSchema")
const { passwordStrength } = require('check-password-strength')
const sendEmail=require('../utils/sendEmail')
const bcrypt=require('bcryptjs')

const otp=require("../models/otpSchema")
/*
router.get("/",(req,res)=>{
    console.log("Connect")
})
*/
console.log(passwordStrength('asdfasdf').value==='Too weak')

router.post('/register1', async (req, res) => {
    console.log(req.body);
    var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    const { name, email,given_name,picture,token,family_name } = req.body
var pass=`QN@#m${token}`
    var m=1;
   
    console.log(name)
    if(validator.validate(email)){
        if(passwordStrength(pass).value==='Strong'||passwordStrength(pass).value==='Medium'){
    try {

        const preuser = await users.findOne({ email: email })
        console.log(preuser)
        if(preuser){
            res.status(404).send("This user already exists")
        }
        else{

    
            
            const adduser=new users({
                name, email,given_name,picture,token,family_name

            })

            
            await adduser.save();
            response.status(201).json(adduser)
            console.log(adduser)
        }
    } catch (error) {
        res.status(404).send(error)
    }}else{
        res.status(404).send("Weak Password")
    }

}else{
        res.status(404).send("Email Not valid")
    }

})




router.post('/register', async (req, res) => {
    console.log(req.body);
    var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    const { name, email,given_name,picture,token,family_name } = req.body

    var m=1;
   
    console.log(name)
    if(validator.validate(email)){
        if(passwordStrength(token).value==='Strong'||passwordStrength(token).value==='Medium'){
    try {

        const preuser = await users.findOne({ email: email })
        console.log(preuser)
        console.log("otp creation section")
        if(preuser){
            res.status(404).send("This user already exists")
            console.log("This user already exist")
        }
        else{
            const adduser=new users({
                name, email,given_name,picture,token,family_name

            })



console.log("otp creation section")




            const d=new Date()
  // const {email}=req.body
   otp5=Math.floor(100000 + Math.random() * 900000)
    const otp1=new otp({
        otp:otp5,email:email,time:d
    
       })
      
   const otp2=await otp.find({email:email})
   console.log(otp2)
   if(otp2.length){
    
    const upd=await otp.updateOne({email:email},{$set:{otp:otp5,time:d}});

    await sendEmail("",otp5,email,"",email)

    res.status(200).send("2")
    console.log("updated")
   }else{
    try {
        
      
           const k1= await otp1.save();
           const k2= await sendEmail("",otp5,email,"",email)
            console.log("success")
            res.status(200).send("2")

        }catch(error){
            console.log(error)
            res.status(404).send("Error otp creation")
        }
    }






           // await adduser.save();
           // res.status(201).json(adduser)
            console.log(adduser)

        }
    } catch (error) {
        //res.status(404).send(error)
        console.log(error)
    }}else{
        res.status(404).send("Weak Password")
    }

}else{
        res.status(404).send("Email Not valid")
    }


})



router.post("/cOtp",async(req,res)=>{
    var {otp5, name, email,given_name,picture,token,family_name } =req.body
    /*
    const adduser=new users({
        name, email,given_name,picture,token,family_name

    })
    */

    const salt=await bcrypt.genSalt(10)
    const secPas=await bcrypt.hash(token,salt)
token=secPas
    const adduser=new users({
        name, email,given_name,picture,token,family_name
    
    })
    try{
    const otp3=await otp.find({otp:otp5,email:email})

   
    if(otp3.length>0){
    const interval=((new Date())-otp3[0].time)/60000
    console.log(interval)
    if(interval>10){
        console.log("Otp expired")
        res.status(200).send("otp expired")
    }
    else{
        console.log("otp accepted")
        
        await adduser.save();


        




        res.status(200).send("2")

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




router.post('/isUser', async (req, res) => {
    console.log(req.body);
    const { name, email,given_name,picture,token,family_name } = req.body
    console.log(name)
    try {
        const preuser = await users.findOne({ email: email })
        console.log(preuser)
        if(bcrypt.compareSync(token,preuser.token)){
            res.status(404).send(preuser)
        }
        else{
            res.status(404).send("0")
           
           
        }
    } catch (error) {
        res.status(404).send(error)
    }
})
router.post('/post', async (req, res) => {
    console.log(req.body);
    const { head, body ,hashtag,time,user,likes,comments} = req.body
    console.log(head)
    try {
        
            const feed=new feed1({
                head, body,time,user,likes,comments,hashtag

            })
            await feed.save();
            response.status(201).json(feed)
            console.log(feed)
        
    } catch (error) {
        res.status(404).send(error)
    }
})
router.get('/fetchPosts', async (req, res) => {
    try{
        const feed = await feed1.find({})
        res.status(200).json(feed)
        console.log(feed)
        console.log("Ramaan")

    }catch(error){
        //error.status(404).json({message:error.message})
        console.log("error")
          
    }

})
router.get('/fetchUsers', async (req, res) => {
    try{
        const user1 = await users.find({})
        res.status(200).json(user1)
        console.log(user1)
        console.log("Raman")

    }catch(error){
        //error.status(404).json({message:error.message})
        console.log("error")
          
    }

})
router.post('/message', async (req, res) => {
    console.log(req.body);
    const { content, from ,to,time} = req.body
    console.log(content)
    try {
        
            const message=new messages({
                content, from ,to,time

            })
            await message.save();
            response.status(201).json(message)
            console.log(message)
        
    } catch (error) {
        res.status(404).send(error)
    }
})
router.post('/fetchMessage', async (req, res) => {
    console.log(req.body);
    const { content, from ,to,time} = req.body
    console.log(from)
    try {
        /*
        {
    "type" : { "$in": ["WebUser", "User"] },
    "city" : { "$in": ["Pune", "Mumbai"] }
}
        */
        const preMessage = await messages.find({ from:{"$in":[ from,to]},to:{"$in":[ from,to]}})
        console.log(preMessage)
        res.status(404).send(preMessage)
    } catch (error) {
        res.status(404).send(error)
    }
})
router.post('/search', async (req, res) => {
    console.log(req.body);
   
    const { name, email,given_name,picture,token,family_name } = req.body


   
  
    try {
        const preuser = await users.find({name:{$regex:`${name}`,$options:"$i"}})
        console.log(preuser)
        if(preuser){
            res.status(404).send(preuser)
        }
        else{
            res.status(404).send("No user Found")
        }
    } catch (error) {
        res.status(404).send(error)
    }

})
router.post('/comment', async (req, res) => {
    console.log(req.body);
    const {  head, body ,hashtag,time,user,likes,comments} = req.body
    console.log(likes)
    try {
        
            const feed=new feed1({
                head, body ,time,user,likes,comments,hashtag

            })
            await feed.save();
            response.status(201).json(feed)
            console.log(feed)
        
    } catch (error) {
        res.status(404).send(error)
    }
})
router.patch('/updateComment', async (req, res) => {
    console.log(req.body);
    const { id,user,time,comments} = req.body
    console.log(id)
    try {
        
           
            const upd=await feed1.findByIdAndUpdate(id,{$push:{comments:{content:comments,time:time,user:user}}},{new:true});
            //const upd=await comment1.findByIdAndUpdate('640def63faa537f85aac2e28',{ $inc: {likes: 1 }},{new:true});
            response.status(201).json(comment)
            console.log(upd)
        
    } catch (error) {
        res.status(404).send(error)
    }
})
router.patch('/updateLikes', async (req, res) => {
    console.log(req.body);
    const { id,user} = req.body
    console.log(id)
    try {
           const feed=await feed1.find({ _id:id,likes:user })
         //  console.log(feed)
           if(feed.length===0){
            const upd=await feed1.findByIdAndUpdate(id,{$push:{likes:user}},{new:true});
            //const upd=await comment1.findByIdAndUpdate('640def63faa537f85aac2e28',{ $inc: {likes: 1 }},{new:true});
            response.status(201).json(feed)
            //console.log(upd)}
        
    }else{
        const upd=await feed1.findByIdAndUpdate(id,{$pull:{likes:user}},{new:true});
            console.log("You have already liked")
            response.status(404).send("You have already liked")

           }} catch (error) {
        res.status(404).send(error)
    }
})
router.patch('/likeStatus', async (req, res) => {
    console.log(req.body);
    const { id,user} = req.body
    console.log(id)
    try {
           const feed=await feed1.find({ _id:id,likes:user })
         //  console.log(feed)
           if(feed.length===0){
            //const upd=await feed1.findByIdAndUpdate(id,{$push:{likes:user}},{new:true});
            //const upd=await comment1.findByIdAndUpdate('640def63faa537f85aac2e28',{ $inc: {likes: 1 }},{new:true});
            response.status(201).json("0")
            //console.log(upd)}
        
    }else{
       // const upd=await feed1.findByIdAndUpdate(id,{$pull:{likes:user}},{new:true});
           // console.log("You have already liked")
            response.status(404).send("1")

           }} catch (error) {
        res.status(404).send(error)
    }
})

router.get('/fetchComments', async (req, res) => {
    try{
        const feed = await feed1.find({})
        res.status(200).json(feed)
        console.log(feed)
        console.log("Raman")

    }catch(error){
        //error.status(404).json({message:error.message})
        console.log("error")
          
    }

})
router.post('/searchPost', async (req, res) => {
    console.log(req.body);
   
    const { head} = req.body


   
  
    try {
        const preuser = await feed1.find({$or:[{hashtag:{$regex:`${head}`,$options:"$i"}},{head:{$regex:`${head}`,$options:"$i"}},{user:{$regex:`${head}`,$options:"$i"}}]})
        console.log(preuser)
        if(preuser){
            res.status(404).send(preuser)
        }
        else{
            res.status(404).send("No user Found")
        }
    } catch (error) {
        res.status(404).send(error)
    }

})


router.post('/seePost', async (req, res) => {
    console.log(req.body);
   
    const { _id} = req.body
    console.log(_id)


   
  
    try {
        const preuser = await feed1.findOne({_id:_id})
        console.log(preuser)
        if(preuser){
            res.status(201).send(preuser)
            console.log(preuser)
            console.log("ha")
        }
        else{
            res.status(404).send("No user Found")
            console.log("Not found")
        }
    } catch (error) {
        res.status(404).send(error)
        console.log("Error")
    }

})



router.post('/fetchProfilePosts', async (req, res) => {
    console.log(req.body)
    const {user}=req.body
    try{
        const feed = await feed1.find({user:user})
        res.status(200).json(feed)
        //console.log(feed)
        console.log("Ramban")

    }catch(error){
        //error.status(404).json({message:error.message})
        console.log("error")
          
    }

})

module.exports = router;