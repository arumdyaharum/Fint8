const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const router = require('./routes/index.js')
const session = require('express-session')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))
// app.use('/', express.static('public'))

app.use(session({
  secret: 'login',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: true
  }
}))

app.use('/', router)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})

// npx sequelize-cli model:generate --name Users --attributes name:string,email:string,password:string,role:string

// npx sequelize-cli model:generate --name Owners --attributes UserId:integer,ProductId:integer

// npx sequelize-cli model:generate --name UsersDetails --attributes money:integer,gender:string,age:integer,UserId:integer

// npx sequelize-cli model:generate --name Products --attributes name:string,price_return:decimal,risk:decimal,price:integer,UserId:integer