const express = require('express')
const router = express.Router()
const Controller = require('../controllers/buyerController.js')

router.get('/', (req, res) => {
  res.send('Hello World!')
})

module.exports = router;