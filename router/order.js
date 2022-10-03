const express = require('express')
const router = express.Router();
const {add_order , get_order} = require('../controller/orders')

router.post('/Add-order',add_order)

router.get('/Order-user',get_order)


module.exports = router
