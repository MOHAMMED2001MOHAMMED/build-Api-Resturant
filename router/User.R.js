const express = require('express')
const router = express.Router();
const {Signup_Post , login_Post , Add_Required_meals , Add_User_by_Admin} = require("../controller/User")


router.post("/login",login_Post)

router.post("/signup",Signup_Post)


router.put('/Add-Required_meals',Add_Required_meals)

router.post('/Add-User', Add_User_by_Admin)




module.exports = router 