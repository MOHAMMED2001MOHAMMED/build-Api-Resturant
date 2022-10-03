const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Chef = mongoose.Schema({
    FirstName : String,
    LastName : String , 
    Phone :String ,
    email : String , 
    password : String ,
    isOK : {
        default : false , 
        type: Boolean
    }
})

const chef = mongoose.model('Chef',Chef)


const Signup_Chef = async (Chef_data)=>{
    try{
 let Chef_signup = await chef.findOne({email:Chef_data.email})
 if(Chef_signup ==null){ 

    let hashPassword = await bcrypt.hash(Chef_data.password,10)

 let new_chef = new chef({
    FirstName : Chef_data.FirstName,
    LastName : Chef_data.LastName , 
    Phone :Chef_data.Phone ,
    email : Chef_data.email , 
    password : hashPassword
 })

  let Chef_save = await new_chef.save()
  return Chef_save

 }else{
/**/
throw "This Email is already registered"
 }

    }catch(error){
throw error        
    }
}




const login_Chef = async(Chef_data)=>{
    try{
        let login_chef = await chef.findOne({email:Chef_data.email})
        if(login_chef == null){
            throw "User is not registered"
        }else{
            let password_compare = await bcrypt.compare(Chef_data.password,login_chef.password)
if(password_compare){
    return login_chef
}else{
    throw "Wrong password"
}
        }

    }catch(error){
throw error
    }

} 




const Add_Chef = async (Chef_data)=>{
    try{
 let Chef_Add = await chef.findOne({email:Chef_data.email})
 if(Chef_Add ==null){ 

    let hashPassword = await bcrypt.hash(Chef_data.password,10)

 let new_chef = new chef({
    FirstName : Chef_data.FirstName,
    LastName : Chef_data.LastName , 
    Phone :Chef_data.Phone ,
    email : Chef_data.email , 
    password : hashPassword ,
    isOK : true
 })

  let Chef_save = await new_chef.save()
  return Chef_save

 }else{
/**/
throw "This Email is already registered"
 }

    }catch(error){
throw error        
    }
}


module.exports = {
    login_Chef , 
    Signup_Chef , 
    Add_Chef
}
