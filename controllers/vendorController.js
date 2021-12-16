const { UsersDetails, Owners, Products, Users } = require('../models/index.js')
const formatUang = require('../helpers/formatUang')
const { Op } = require('sequelize')
const bcryptjs = require('bcryptjs')


class Controller {
    static getvendordaftar(req, res) {
        // res.send('test')
        let errors = []
        if (req.query.errors) {
            errors = req.query.errors.split(',')
        }
        res.render('vendor/vendordaftar', { errors })
    }

    static postvendordaftar(req, res) {
        const { name, email, password } = req.body
        Users.findOne({ where: { email: email } })
            .then(data => {
                if (data) {
                    let errors = 'Email sudah ada. Harap gunakan email yang lain.'
                    return res.redirect(`/vendor/daftar?errors=${errors}`)
                }
                const valueUsers = { name, email, password, role: 'vendor', createdAt: new Date(), updatedAt: new Date() }
                Users.create(valueUsers)
            })
            // .then(data => {
            //   const valueBuyers = { gender, age: parseInt(age), UserId: data.dataValues.id, createdAt: new Date(), updatedAt: new Date() }
            //   return UsersDetails.create(valueBuyers)
            // })
            .then(data => res.redirect('/vendor/login'))
            .catch(err => {
                if (err.name == "SequelizeValidationError") {
                    let errors = err.errors.map(el => el.message)
                    res.redirect(`/vendor/daftar?errors=${errors}`)
                } else {
                    res.send(err)
                }
            })
    }


    static vendorLogin(req, res) {
        let errors = []
        if (req.query.errors) {
            errors = req.query.errors.split(',')
        }
        res.render('vendor/vendorlogin', { errors });

    }
    static vendorLoginPost(req, res) {
        const { email, password } = req.body;
        Users.findOne({ where: { email: email } })
            .then(data => {
                if (data) {
                    let login = bcryptjs.compareSync(password, data.dataValues.password)
                    if (login) {
                        req.session.users = { usersId: data.dataValues.id, role: data.dataValues.role }
                        res.redirect('/vendor/detail/'+data.dataValues.id)
                    } else {
                        let errors = 'maaf email/password salah'
                        res.redirect(`/vendor/login?errors=${errors}`)
                    }
                } else {
                    let errors = 'maaf email/password salah'
                    return res.redirect(`/vendor/login?errors=${errors}`)
                }
            })
            .catch(err => {
                res.send(err)
            })
    }

    static home(req, res) {
        let dataUser;
        let errors = []
        if (req.query.errors) {
            errors = req.query.errors.split(',')
        }
        Users.findByPk(req.session.users.usersId, {
            include: UsersDetails
        })
            .then(data => {
                dataUser = data
                let find = {
                    include: Users
                }
                if (req.query.sort) {
                    find.order = [[req.query.sort, req.query.order]]
                }
                return Products.buyerSort(find)
            })
            .then(data => {
                res.render('vendor/vendorhome', { product: data, data: dataUser, errors, formatUang })
            })
            .catch(err => res.send(err))
    }

    static vendorlogout(req,res){
        req.session.destroy(err => {
            if(err) {
              res.send(err)
            } else {
              res.redirect('/vendor/login')
            }
          })
    }

    static home2(req, res) {
        // res.send('home')
        // res.render('vendor/vendorhome')
        let dataProduct;
        let dataUser
        let dataOwner

        Products

            .findAll({

            })
            .then(data => {
                res.send(data)
                // res.render('', { data });
            })

            .catch(err => {
                console.log(err);
                res.send(err)
            })


    }

    static vendordetail(req, res) {
        // res.send('test')
        // res.render('vendor/vendordetail')
        let dataProduct;
        let dataUser
        let dataOwner

        Products

            .findAll({
                include: { model: Users, where: { id: req.params.id } }
                // where : {id:req.params.id}
                // where : {id:req.params.id}
            })

            .then(data => {

                dataProduct = data
                // res.send(data)
                return Users.findByPk(req.params.id)
            })
            .then(data => {

                dataUser = data
                let product = dataProduct.map(val => val.id)

                return Owners.findAll({ where: { ProductId: { [Op.in]: product } } })
            })

            .then(data => {
                let output = []
                for (let i = 0; i < data.length; i++) {
                    let flag = false
                    let id = 0
                    for (let j = 0; j < output.length; j++) {
                        if (output[j].ProductId === data[i].ProductId) {
                            flag = true
                            id = j
                        }
                    }

                    if (flag) {
                        output[id].jumlah++
                    } else {
                        output.push({ ProductId: data[i].ProductId, jumlah: 1 })
                    }
                }

                // res.send(data)
                res.render('vendor/vendordetail', { dataUser, dataProduct, dataOwner: output, formatUang })
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })

    }
    static vendordelete(req, res) {

        Products
            .destroy({
                where: {

                    id: req.params.productId
                }
            })
            .then(data => {
                res.redirect('/vendor/detail/' + req.params.userId)
            })
            .catch(err => {
                res.send(err)
            })
    }
    static getvendoradd(req, res) {
        // res.send('getvendoradd')
        // res.render('vendor/addproduct')

        Users
            .findByPk(req.params.id)

            .then(data => {
                // res.send(data)
                res.render('vendor/addproduct', { data })
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })


    }
    static postvendoradd(req, res) {
        // res.send('postvendoradd')
        const { name, price_return, risk, price } = req.body;
        const value = { UserId: req.params.id, name, price_return, risk, price, createdAt: new Date(), updatedAt: new Date() };
        Products
            .create(value)
            .then(data => { res.redirect('/vendor/detail/' + req.params.id) })
    }
}


module.exports = Controller;