const {Signup_User , login_User , Required_meals , Add_User} = require('../model/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const Signup_Post = async(req,res,next)=>{
    try{
     await Signup_User(req.body)
      res.status(200).json({massage : "success"});
    }catch(error){
res.status(404).json({massage:error})
    }
}


const login_Post = async(req,res,next)=>{
    try{
        console.log(req.body);
        console.log(req.headers.authorization);
let login  = await login_User(req.body)

let user = {
    email : login.email ,
    isUser: true,
    isAdmin : login.isAdmin,
    id : login._id
}

let token = jwt.sign(user , process.env.JWT_SECRET)
console.log('token');
 res.json({tokenUser : token});

    }catch(error){
        console.log('errr');
        res.status(404).json({massage:error})
    }
}


const Add_Required_meals = async(req,res,next)=>{
    try{
        let token = req.header('Authorization')
        let data_user = jwt.verify(token,process.env.JWT_SECRET)

 await Required_meals(data_user.email,req.body)
 res.status(200).json({massage:"success Add-Required_meals"})
    }catch(error){
res.status(404).json({error:error})
    }
}


const Add_User_by_Admin = async(req,res)=>{
    try{
        let token = req.header('Authorization')
        let data_Admin = jwt.verify(token,process.env.JWT_SECRET)
     
        if(data_Admin.isAdmin){
            await Add_User(req.body)
            res.status(200).json({massage:"success Add-User"})
        }else{
            res.status(404).json({error:"The token is not Admin"})
        }

    }catch(err){
res.status(404).json({error:err});
    }
}










module.exports = {
    Signup_Post ,
    login_Post ,
    Add_Required_meals, 
    Add_User_by_Admin
}