const express =require('express')
const app=express()

const bcrypt=require('bcryptjs')
/*
async function Hash(){
const salt=await bcrypt.genSalt(10)
const secPas=await bcrypt.hash("raman",salt)
const secPas2=await bcrypt.hash("raman",salt)
console.log(secPas)
console.log(bcrypt.compareSync("raman1",secPas))
console.log(bcrypt.compareSync("raman",secPas2))
}
*/






const cors=require("cors")
app.use(cors())
const http=require("http")
const {Server}=require('socket.io')
const server=http.createServer(app)
require("dotenv").config();


const mongoose=require('mongoose');
const conn=require('./db/conn.js')
const users=require('./models/userSchema')

const router=require('./routes/routes')

const port=process.env.PORT;
app.use(cors())
app.use(express.json())
app.use(router)
const io=new Server(server,{
    cors:{
        //https://socketrmn1.netlify.app/
        origin:["http://192.168.109.6:3000","http://localhost:3000","http://socketrmn.epizy.com","https://socketrmn1.netlify.app","https://rmnprj.000webhostapp.com/","http://collegeconnnect.epizy.com"],
        method:["GET","POST"],

    },
})
io.on("connection",(socket)=>{
    console.log(`User connected ${socket.id}`)
    socket.on("send_message",(data)=>{
        console.log(data)
        socket.broadcast.emit("receive",`${data}---${socket.id}`)
    })
    socket.on("send_message1",(data)=>{
        console.log(data)
        socket.broadcast.emit("receive1",`{${socket.id}}=>${data}`)
    })
})
server.listen(port,()=>{
    console.log("Server is running hello")
  
})
