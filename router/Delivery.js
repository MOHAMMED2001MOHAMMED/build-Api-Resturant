const express = require('express')
const router = express.Router();
const {login_delivery,signup_delivery , add_delivery} = require('../controller/Delivery')

router.post('/Delivery/signup',signup_delivery)

router.post('/Delivery/login',login_delivery)

router.post('/Add-delivery',add_delivery)

module.exports = router
