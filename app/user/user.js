const express = require('express')
const app = express()
const fs = require('fs')
const router = express.Router()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

router.get('/users', (request, response) => {
  let fileContent = fs.readFileSync('./app/user/users.json', 'utf8')
  let user = JSON.parse(fileContent)
  response.send(user)
})

router.post('/users', jsonParser, (request, response) => {
  if (request.body) {
    let maxId
    const user = request.body
    const users = JSON.parse(fs.readFileSync('./app/user/users.json', 'utf8'))
    users.forEach((user) => {
      maxId = Math.max(user.id)
    })
    user.id = maxId + 1
    users.push(user)
    fs.writeFileSync('./app/user/users.json', JSON.stringify(users))
    response.send(user)
  } else {
    return response.sendStatus(400)
  }
})

module.exports = router
