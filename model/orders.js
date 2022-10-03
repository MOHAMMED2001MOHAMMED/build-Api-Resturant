const mongoose = require('mongoose')

const Orders = mongoose.Schema({
    IdUser : String , 
    PriceAll : Number , 
    amount : Number , 
    IdProduct : String ,
    NameProduct:String,
    Price : String ,
    OrderStatus : {
        default : "The request was successfully completed" , 
        type :  String
    }
})


const order = mongoose.model('Oreders',Orders)


const Add_Order = async(data_order)=>{
    try{

        let order_user = new order({
            IdUser : data_order.id , 
            PriceAll : data_order.PriceAll , 
            amount : data_order.amount ,
            IdProduct : data_order.IdProduct , 
            NameProduct : data_order.NameProduct , 
            Price : data_order.Price
         })

      let add =  await order_user.save()
   
return true

    }catch(error){
throw error
    }
}

const Get_Order = async(id)=>{
    try{

       let order_id = await order.find({IdUser : id})
       console.log(order_id);
       return order_id

    }catch(error){
        throw error
    }
}



module.exports = {
Add_Order ,
Get_Order
}