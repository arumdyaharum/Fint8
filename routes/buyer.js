const express = require('express')
const router = express.Router()
const Controller = require('../controllers/buyerController.js')

router.get('/daftar', Controller.buyerDaftar)

router.post('/daftar', Controller.buyerDaftarPost)

router.get('/login', (req, res) => {
  res.send('Hello World!')
})

router.post('/login', (req, res) => {
  res.send('Hello World!')
})

router.get('/logout', (req, res) => {
  res.send('Hello World!')
})

router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.get('/saldo', (req, res) => {
  res.send('Hello World!')
})

router.get('/saldo/:jumlah', (req, res) => {
  res.send('Hello World!')
})

router.get('/investasiSaya', (req, res) => {
  res.send('Hello World!')
})

router.get('/investasiSaya/:productId/jual', (req, res) => {
  res.send('Hello World!')
})

router.get('/profil', (req, res) => {
  res.send('Hello World!')
})

router.get('/profil/edit', (req, res) => {
  res.send('Hello World!')
})

router.post('/profil/edit', (req, res) => {
  res.send('Hello World!')
})

module.exports = router;