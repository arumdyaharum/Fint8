const { UsersDetails, Owners, Products, Users } = require('../models/index.js')
const bcryptjs = require('bcryptjs')
const { Op } = require('sequelize')
const formatUang = require('../helpers/formatUang')

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

  static buyerLogout(req, res) {
    req.session.destroy(err => {
      if(err) {
        res.send(err)
      } else {
        res.redirect('/buyer')
      }
    })
  }

  static buyerHome(req, res) {
    let dataUser;
    let errors = []
    if(req.query.errors) {
      errors = req.query.errors.split(',')
    }
    Users.findByPk(req.session.users.usersId, {
      include: UsersDetails
    })
    .then(data => {
      dataUser = data
      return Products.buyerSort(req.query.sort, req.query.order)
    })
    .then(data => {
      res.render('buyer/buyerHome', {product: data, data: dataUser, errors, formatUang})
    })
    .catch(err => res.send(err))
  }

  static buyerSaldo(req, res) {
    Users.findByPk(req.session.users.usersId, {
      include: UsersDetails
    })
    .then(data => {
      let uang = data.dataValues.UsersDetail.money + 100000
      return UsersDetails.update({money: uang}, {where: {id : data.dataValues.UsersDetail.id}})
    })
    .then(data => {
      res.redirect('/buyer')
    })
    .catch(err => {
      res.send(err)
    })
  }

  static buyerMyStock(req, res) {
    Users.findByPk(req.session.users.usersId, {
      include: {
        model: Products,
        include: Users
      }
    })
    .then(data => {
      res.render('buyer/buyerMyStock', {data: data.Products, formatUang})
    })
  }

  static buyerJual(req, res) {
    let uang;
    UsersDetails.findOne({where: {UserId: req.params.userId}})
    .then(data => {
      uang = data.money
      return Products.findOne({where: {id: req.params.productId}})
    })
    .then(data => {
      let tambah = uang + data.price
      return UsersDetails.update({money: tambah}, {where: {UserId: req.params.userId}})
    })
    .then(data => {
      return Owners.destroy({where: {
        UserId: req.params.userId,
        ProductId: req.params.productId
      }})
    })
    .then(data => {
      res.redirect('/buyer/investasiSaya')
    })
    .catch(err => {
      res.send(err)
    })
  }

  static buyerBuy(req, res) {
    let uang;
    Owners.findOne({where: {UserId: req.params.userId, ProductId: req.params.productId}})
    .then(data => {
      if(data) {
        let errors = 'Maaf Anda telah membeli produk tersebut.'
        res.redirect(`/buyer?errors=${errors}`)
      } else {
        return UsersDetails.findOne({where: {UserId: req.params.userId}})
      }
    })
    .then(data => {
      uang = data.money
      return Products.findOne({where: {id: req.params.productId}})
    })
    .then(data => {
      let selisih = uang - data.price
      if(selisih < 0) {
        let errors = 'Maaf uang Anda tidak cukup.'
        res.redirect(`/buyer?errors=${errors}`)
      } else {
        return UsersDetails.update({money: selisih}, {where: {UserId: req.params.userId}})
      }
    })
    .then(data => {
      let buy = { UserId: req.params.userId, ProductId: req.params.productId, createdAt:new Date(), updatedAt:new Date() }
      return Owners.create(buy)
    })
    .then(data => {
      res.redirect('/buyer/investasiSaya')
    })
    .catch(err => {
      res.send(err)
    })
  }
}

module.exports = Controller;