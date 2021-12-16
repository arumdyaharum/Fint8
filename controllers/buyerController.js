const { UsersDetails, Owners, Products, Users } = require('../models/index.js')
const bcryptjs = require('bcryptjs')

class Controller {
  static buyerDaftar(req, res) {
    let errors = []
    if(req.query.errors) {
      errors = req.query.errors.split(',')
    }
    res.render('buyer/buyerDaftar', {errors})
  }

  static buyerDaftarPost(req, res) {
    const { name, email, password, gender, age } = req.body
    Users.findOne({where: {email: email}})
    .then(data => {
      if(data) {
        let errors = 'Email sudah ada. Harap gunakan email yang lain.'
        return res.redirect(`/buyer/daftar?errors=${errors}`)
      }
      const valueUsers = { name, email, password, role: 'buyer', createdAt: new Date(), updatedAt: new Date() }
      return Users.create(valueUsers)
    })
    .then(data => {
      const valueBuyers = { gender, age: parseInt(age), UserId: data.dataValues.id, createdAt: new Date(), updatedAt: new Date() }
      return UsersDetails.create(valueBuyers)
    })
    .then(data => res.redirect('/buyer/login'))
    .catch(err => {
      if(err.name == "SequelizeValidationError") {
        let errors = err.errors.map(el => el.message)
        res.redirect(`/buyer/daftar?errors=${errors}`)
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
      if(data) {
        let login = bcryptjs.compareSync(password, data.dataValues.password)
        if(login) {
          req.session.users = { usersId: data.dataValues.id, role: data.dataValues.role }
          res.redirect('/buyer')
        } else {
          let errors = 'maaf email/password salah'
          res.redirect(`/buyer/login?errors=${errors}`)
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