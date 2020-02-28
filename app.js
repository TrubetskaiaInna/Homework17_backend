const express = require('express')
const app = express()
const user = require('./app/user/user')

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, x-apikey, X-Requested-With, Content-Type, Accept')
  next()
})

app.use('/', user)

app.listen(3000, function () {
  console.log('server is listening on 3000 port')
})


