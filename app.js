const express = require('express')
const User = require('./router/User.R')
const index = require('./router/index.R')
const Chef = require('./router/Chef.R')
const Delivery = require('./router/Delivery')
const Products = require('./router/Products')
const Orders = require('./router/order')
const mongoose = require('mongoose')
const aws = require('aws-sdk')
const ses = new aws.SES({region:"us-east-2"})


const app = express()



const cors = require("cors")
const { Socket } = require('socket.io')



mongoose.connect('mongodb://localhost:27017/Food',(err)=>{
    if(err){
        console.log(err);
    }
    console.log('sucsess conect db');
})






app.use(cors())
app.use(express.json());
app.use(User)
app.use(index)
app.use(Chef)
app.use(Delivery)
app.use(Products)
app.use(Orders)










app.listen(8000,()=>{
    console.log('http://localhost:8000');
})
/*
io = require('socket.io')(server,{
    cors:{
origin :"*"
    }
})

io.on('connection',(Socket)=>{
   // console.log(Socket.id);
Socket.emit("data",'JJJJ')
Socket.on("Notefcation",(data)=>{
    console.log(data);
})
})
*/
