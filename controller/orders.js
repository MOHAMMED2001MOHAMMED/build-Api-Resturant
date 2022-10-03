const {Add_Order , Get_Order} = require('../model/orders')
const {get_Product_id} = require('../model/Products')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const add_order = async(req,res,next)=>{
    try{
let get_product = await get_Product_id(req.body.IdProduct)

let token = req.header('Authorization')
let data_user = jwt.verify(token,process.env.JWT_SECRET)

if(data_user.isUser){
    let order ={
        id : data_user.id , 
        IdProduct : req.body.IdProduct,
        PriceAll : req.body.amount * get_product.Products_Price ,
        amount : req.body.amount ,
        NameProduct : req.body.NameProduct , 
        Price : req.body.Price
    }
    await Add_Order(order)
res.status(200).json({massage:'success'})
}else{
    res.status(404).json({massage:"you are not user"})
}
       
    }catch(error){
        res.status(500).json({error:error});
    }
}



const get_order = async(req,res)=>{
    try{
        let token = req.header('Authorization')
        let data_user = jwt.verify(token,process.env.JWT_SECRET)

        if(data_user.isUser){
         let order =  await Get_Order(data_user.id)
         console.log(order);
         res.status(200).json({order:order})
        }else{
            res.status(404).json({error:"you are not user"})
        }

    }catch(error){
res.status(500).json({error:error})
    }
}








module.exports = {
    add_order , 
    get_order
}