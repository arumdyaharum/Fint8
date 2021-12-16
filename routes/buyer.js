const express = require('express')
const router = express.Router()
const Controller = require('../controllers/buyerController.js')

router.get('/daftar', Controller.buyerDaftar)

router.post('/daftar', Controller.buyerDaftarPost)

router.get('/login', Controller.buyerLogin)

router.post('/login', Controller.buyerLoginPost)

router.get('/logout', (req, res) => {
  res.send('Hello World!')
})

router.use((req, res, next) => {
  if(req.session.usersId && req.session.role === 'buyer') {
    next()
  } else {
    let errors = 'Harap login terlebih dahulu.'
    res.redirect(`/buyer/login?errors=${errors}`)
  }
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