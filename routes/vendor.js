const express = require('express')
const router = express.Router()
const Controller = require('../controllers/vendorController.js')


router.get('/', Controller.home )
router.get('/daftar', Controller.getvendordaftar )
router.post('/daftar', Controller.postvendordaftar )

router.get('/login', Controller.vendorLogin)

router.post('/login', Controller.vendorLoginPost)

router.get('/logout', Controller.vendorlogout)

router.use((req, res, next) => {
    if(req.session.users) {
      if(req.session.users.role == 'vendor') {
        next()
      } else {
        let errors = 'Maaf anda seorang Buyer. Silahkan masuk di page Buyer.'
        res.redirect(`/vendor/login?errors=${errors}`)
      }
    } else {
      let errors = 'Harap login terlebih dahulu.'
      res.redirect(`/vendor/login?errors=${errors}`)
    }
  })


router.get('/delete/:productId', Controller.vendordelete )
router.get('/detail/add', Controller.getvendoradd )
router.post('/detail/add', Controller.postvendoradd )
router.get('/detail', Controller.vendordetail )

module.exports = router;