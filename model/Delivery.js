const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Delivery = mongoose.Schema({
    FirstName : String,
    LastName : String , 
    Phone :String ,
    email : String , 
    password : String , 
    isOk: {
        default : true , 
        type: Boolean
    }
})

const delivery = mongoose.model('Delivery',Delivery)



const Signup_Delivery = async (Delivery_data)=>{
    try{
 let Delivery_signup = await delivery.findOne({email:Delivery_data.email})
 if(Delivery_signup ==null){ 

    let hashPassword = await bcrypt.hash(Delivery_data.password,10)

 let new_delivery = new delivery({
    FirstName : Delivery_data.FirstName,
    LastName : Delivery_data.LastName , 
    Phone :Delivery_data.Phone ,
    email : Delivery_data.email , 
    password : hashPassword
 })

  let Delivery_save = await new_delivery.save()
  return Delivery_save

 }else{
/**/
throw "This Email is already registered"
 }

    }catch(error){
throw error        
    }
}




const login_Delivery = async(Delivery_data)=>{
    try{
        let login_delivery = await delivery.findOne({email:Delivery_data.email})
        if(login_delivery == null){
            throw "User is not registered"
        }else{
            let password_compare = await bcrypt.compare(Delivery_data.password,login_delivery.password)
if(password_compare){
    return login_delivery
}else{
    throw "Wrong password"
}
        }

    }catch(error){
throw error
    }

} 



const Add_Delivery = async (Delivery_data)=>{
    try{
 let Delivery_Add = await delivery.findOne({email:Delivery_data.email})
 if(Delivery_Add ==null){ 

    let hashPassword = await bcrypt.hash(Delivery_data.password,10)

 let new_delivery = new delivery({
    FirstName : Delivery_data.FirstName,
    LastName : Delivery_data.LastName , 
    Phone :Delivery_data.Phone ,
    email : Delivery_data.email , 
    password : hashPassword , 
    isOk : true
 })

  let Delivery_save = await new_delivery.save()
  return Delivery_save

 }else{
/**/
throw "This Email is already registered"
 }

    }catch(error){
throw error        
    }
}




module.exports = {
    login_Delivery , 
    Signup_Delivery,
    Add_Delivery
               }
