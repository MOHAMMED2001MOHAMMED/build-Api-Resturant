const {Signup_Delivery,login_Delivery,Add_Delivery} = require('../model/Delivery')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const login_delivery = async(req,res,next)=>{
    try{
let login = await login_Delivery(req.body)
let delivery = {
    email : login.email, 
    isChef : true , 
    id : login._id
}
let token = jwt.sign(delivery , process.env.JWT_SECRET)
 res.json({tokenUser : token});

    }catch(error){
        console.log(error);
res.status(404).json({error:error})
    }
}


const signup_delivery = async(req,res,next)=>{
    try{
        console.log(req.body);
        await Signup_Delivery(req.body)
        res.status(200).json({massage : "success"});
    }catch(error){
        console.log(error);
        res.status(404).json({massage:error})
    }
}


const add_delivery = async(req,res,next)=>{
    try{
        let token = req.header('Authorization')
        let data_Admin = jwt.verify(token,process.env.JWT_SECRET)
     
        if(data_Admin.isAdmin){
            await Add_Delivery(req.body)
            res.status(200).json({massage:"success Add-User"})
        }else{
            res.status(404).json({error:"The token is not Admin"})
        }
    }catch(error){
        res.status(404).json({error:error})
    }

}



module.exports ={
    login_delivery , 
    signup_delivery,
    add_delivery
}