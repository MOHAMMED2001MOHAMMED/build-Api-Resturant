const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const User = mongoose.Schema({
    email : String , 
    password : String ,
    FullAddress : String , 
    City :String ,
    Country:String,
    phone :String,
    Street : String , 
    FirstName : String , 
    LastName:String ,
    Required_meals : {
        default : [] , 
        type : [String]
    },
    isAdmin : {
        default : false ,
        type : Boolean
    },
    isOK :{
        default : false ,
        type :Boolean
    }
})

const user = mongoose.model("User",User)


const Signup_User = async (User_data)=>{
    try{
 let user_signup = await user.findOne({email:User_data.email})
 if(user_signup ==null){ 

    let hashPassword = await bcrypt.hash(User_data.password,10)

 let new_user = new user({
    email : User_data.email , 
    password : hashPassword ,
    FullAddress : User_data.FullAddress , 
    City :User_data.City ,
    Country:User_data.Country,
    phone :User_data.phone,
    Street : User_data.Street
 })

  let user_save = await new_user.save()
  return user_save

 }else{
/**/
throw "This email is already registered"
 }

    }catch(error){
throw error        
    }
}


const login_User = async(User_data)=>{
    try{
        console.log('start',User_data);
        let login = await user.findOne({email:User_data.email})
        if(login == null){
            throw "User is not registered"
        }else{
            let password_compare = await bcrypt.compare(User_data.password,login.password)
if(password_compare){
    return login 
}else{
    throw "Wrong password" 
}  
        } 

    }catch(error){
throw error
    }

} 



const Required_meals = async(eamil,User_data)=>{
    try{
    await user.updateOne({email:eamil},{$push:{Required_meals:User_data.id}})
    }catch(error){
throw error
    }
}



const Add_User = async(User_data)=>{
    try{
        let user_add = await user.findOne({email:User_data.email})
        if(user_add ==null){ 
       
           let hashPassword = await bcrypt.hash(User_data.password,10)
       
        let new_user = new user({
           email : User_data.email , 
           password : hashPassword ,
           FullAddress : User_data.FullAddress , 
           City :User_data.City ,
           Country:User_data.Country,
           phone :User_data.phone,
           Street : User_data.Street,
           isOK: true
        })
       
         let user_save = await new_user.save()
         return user_save
       
        }else{
       /**/
       throw "This email is already registered"
        }
       
           }catch(error){
       throw error        
           }
}






module.exports ={
    Signup_User,
    login_User , 
    Required_meals,
    Add_User
}
