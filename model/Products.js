const mongoose = require('mongoose')

const Products = mongoose.Schema({
    Products_Name : String,
    Products_Price : Number , 
    Products_description :String ,
    Products_image : String , 
})

const products = mongoose.model('Products',Products)

const Add_Products = async(data)=>{
    try{

    let product = new products({
        Products_Name : data.Products_Name,
    Products_Price : data.Products_Price , 
    Products_description :data.Products_description ,
    Products_image : data.Products_image , 
    })

   let product_save =  await product.save()

    return product_save

    }catch(error){
        throw error
    }
}


const Delete_Products = async(id)=>{
    try{
    await products.deleteOne({_id:id.id})
    return true
    }catch(err){
        throw err
    }
}


const get_products = async()=>{
    try{
    let All_Products = await products.find({})
    return All_Products
    }catch(err){
        throw err
    }
}


const get_Product_id = async(id)=>{
    try{
       console.log(id)
let prodectId = await products.findById(id)
return prodectId 
    }catch(err){
        throw err
    }
}


module.exports = {
    Add_Products, 
    Delete_Products , 
    get_products,
    get_Product_id
}

