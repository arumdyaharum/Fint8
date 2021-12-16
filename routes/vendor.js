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
        let errors = 'Maaf Anda tidak bisa masuk.'
        res.redirect(`/vendor/login?errors=${errors}`)
      }
    } else {
      let errors = 'Harap login terlebih dahulu.'
      res.redirect(`/vendor/login?errors=${errors}`)
    }
  })


router.get('/delete/:userId/:productId', Controller.vendordelete )
router.get('/detail/add/:id', Controller.getvendoradd )
router.post('/detail/add/:id', Controller.postvendoradd )
router.get('/detail/:id', Controller.vendordetail )

module.exports = router;