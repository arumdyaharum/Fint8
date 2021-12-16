const express = require('express')
const router = express.Router()
const Controller = require('../controllers/buyerController.js')

router.get('/daftar', Controller.buyerDaftar)

router.post('/daftar', Controller.buyerDaftarPost)

router.get('/login', Controller.buyerLogin)

router.post('/login', Controller.buyerLoginPost)

router.use((req, res, next) => {
  if(req.session.users) {
    if(req.session.users.role == 'buyer') {
      next()
    } else {
      let errors = 'Maaf Anda tidak bisa masuk.'
      res.redirect(`/buyer/login?errors=${errors}`)
    }
  } else {
    let errors = 'Harap login terlebih dahulu.'
    res.redirect(`/buyer/login?errors=${errors}`)
  }
})

router.get('/', Controller.buyerHome)

router.get('/logout', Controller.buyerLogout)

router.get('/buy/:productId', (req, res) => {
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