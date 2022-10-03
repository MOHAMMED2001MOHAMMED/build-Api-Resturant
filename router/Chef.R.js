const express = require('express')
const router = express.Router();
const {login_chef,signup_chef , add_chef} = require('../controller/Chef')

router.post('/Chef/signup',signup_chef)

router.post('/Chef/login',login_chef)

router.post('/Chef/Add-chef',add_chef)

module.exports = router

