const {get_products} = require('../model/Products')
const index = async(req,res,next)=>{
    try{
let products = await get_products()
console.log(products);
res.status(200).json({Products : products})
    }catch(error){
res.status(500).json({error:error})
    }
}

module.exports = {
    index
}

