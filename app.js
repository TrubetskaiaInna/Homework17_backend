const express = require('express')
const app = express()
const user = require('./app/user/user')
const post = require('./app/post/post')

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
  if (req.method === 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
})

app.use('/', user)
app.use('/', post)

app.listen(3000, function () {
  console.log('server is listening on 3000 port')
})


