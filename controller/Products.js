const {Add_Products,Delete_Products , get_products} = require('../model/Products')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const add_products  = async(req,res,next)=>{
    try{
        let token = req.header('Authorization')
        let data_Admin = jwt.verify(token,process.env.JWT_SECRET)
     
        if(data_Admin.isAdmin){
            console.log(req.body);
           await Add_Products(req.body)
          res.status(200).json({massage : "success"});
        }else{
    res.status(404).json({error:"The token is not Admin"})
}
    }catch(error){
res.status(500).json({error:error})
    }
}


const delete_products = async(req,res,next)=>{
    try{
        console.log(req.body);
        let token = req.header('Authorization')
        let data_Admin = jwt.verify(token,process.env.JWT_SECRET)

        if(data_Admin.isAdmin){
            await  Delete_Products(req.body)
            res.status(200).json({massage : "success"});

        }else{
            res.status(404).json({error:"The token is not Admin"})

        }
    }catch(error){
        res.status(500).json({error:error})

    }
}





module.exports = {
    add_products,
    delete_products,
}