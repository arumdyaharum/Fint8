const { Buyers, Owners, Products, Users } = require('../models/index.js')

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
}

module.exports = Controller;