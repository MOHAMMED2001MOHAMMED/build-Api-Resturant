const express = require('express')
const router = express.Router();

const {add_products , delete_products}=require('../controller/Products')

router.post('/Add-Product',add_products)

router.delete('/Delete-Product', delete_products)


module.exports = router