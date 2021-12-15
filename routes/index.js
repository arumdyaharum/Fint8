const express = require('express')
const router = express.Router()
const buyerRouter = require('./buyer.js')
const vendorRouter = require('./vendor.js')
const mainController = require('../controllers/mainController.js')

router.get('/', mainController.home)

router.use('/buyer', buyerRouter)
router.use('/vendor', vendorRouter)

module.exports = router;