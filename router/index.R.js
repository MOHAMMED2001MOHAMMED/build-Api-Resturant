const express = require('express')
const router = express.Router();
const {index} = require("../controller/index")

router.get('/',index)


module.exports = router