const express = require('express')
const router = express.Router()
const Controller = require('../controllers/buyerController.js')

router.get('/daftar', Controller.buyerDaftar)

router.post('/daftar', Controller.buyerDaftarPost)

router.get('/login', Controller.buyerLogin)

router.post('/login', Controller.buyerLoginPost)

router.get('/logout', Controller.buyerLogout)

router.use((req, res, next) => {
  if(req.session.users) {
    if(req.session.users.role == 'buyer') {
      next()
    } else {
      let errors = 'Maaf anda seorang Vendor. Silahkan masuk di page Vendor.'
      res.redirect(`/buyer/login?errors=${errors}`)
    }
  } else {
    let errors = 'Harap login terlebih dahulu.'
    res.redirect(`/buyer/login?errors=${errors}`)
  }
})

router.get('/', Controller.buyerHome)

router.get('/buy/:userId/:productId', Controller.buyerBuy)

router.get('/saldo', Controller.buyerSaldo)

router.get('/investasiSaya', Controller.buyerMyStock)

router.get('/investasiSaya/:userId/:productId', Controller.buyerJual)

router.get('/sendmail', Controller.sendmail)

module.exports = router;