const { Buyers, Owners, Products, Users } = require('../models/index.js')
const bcryptjs = require('bcryptjs')

class Controller {
  static buyerDaftar(req, res) {
    res.render('buyer/buyerDaftar')
  }

  static buyerDaftarPost(req, res) {
    const { name, email, password, gender, age } = req.body
    const valueUsers = { name, email, password, role: 'buyer', createdAt: new Date(), updatedAt: new Date() }
    Users.create(valueUsers)
      .then(data => {
        const valueBuyers = { gender, age, BuyerId: data.id, createdAt: new Date(), updatedAt: new Date() }
        return Buyers.create(valueBuyers)
      })
      .then(data => res.redirect('/buyer/login'))
      .catch(err => {
        if(err.name == "SequelizeValidationError") {
          res.send(err.errors.map(el => el.message))
        } else {
          res.send(err)
        }
      })
  }

  static buyerLogin(req, res) {
    let errors = []
    if(req.query.errors) {
      errors = req.query.errors.split(',')
    }
    res.render('buyer/buyerLogin', {errors});
  }

  static buyerLoginPost(req, res) {
    const { email, password } = req.body;
    Users.findOne({where: {email: email}})
    .then(data => {
      console.log(data);
      if(data) {
        if(bcryptjs.compareSync(password, data.password)) {
          req.session.usersId = data.id
          res.session.role = data.role
          req.session.name = data.name
          return res.redirect('/buyer')
        } else {
          let errors = 'maaf email/password salah'
          return res.redirect(`/buyer/login?errors=${errors}`)
        }
      } else {
        let errors = 'maaf email/password salah'
        return res.redirect(`/buyer/login?errors=${errors}`)
      }
    })
    .catch(err => {
      res.send(err)
    })
  }
}

module.exports = Controller;