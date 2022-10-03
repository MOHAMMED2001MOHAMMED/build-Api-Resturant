const {Signup_Chef,login_Chef , Add_Chef} = require('../model/Chef')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const login_chef = async(req,res,next)=>{
    try{
       
let login = await login_Chef(req.body)
let chef = {
    email : login.email, 
    isChef : true , 
    id : login._id
}
let token = jwt.sign(chef , process.env.JWT_SECRET)
 res.json({tokenUser : token});

    }catch(error){
        console.log(error);
res.status(404).json({error:error})
    }
}


const signup_chef = async(req,res,next)=>{
    try{
        await Signup_Chef(req.body)
        res.status(200).json({massage : "success"});
    }catch(error){
        console.log(error);
        res.status(404).json({massage:error})
    }
}

const add_chef = async(req,res)=>{
    try{
        let token = req.header('Authorization')
        let data_Admin = jwt.verify(token,process.env.JWT_SECRET)
     
        if(data_Admin.isAdmin){
            await Add_Chef(req.body)
            res.status(200).json({massage : "success"});
        }else{
            res.status(404).json({error:"The token is not Admin"})

        }
    }catch(err){
        res.status(404).json({error:err})

    }
}



module.exports ={
    login_chef , 
    signup_chef , 
    add_chef
}