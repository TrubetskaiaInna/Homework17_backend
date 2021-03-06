const express = require('express')
const fs = require('fs')
const router = express.Router()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

router.get('/users', (request, response) => {
  const fileContent = fs.readFileSync('./app/user/users.json', 'utf8')
  const user = JSON.parse(fileContent)
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

router.delete('/users/:id', (request, response) => {
  const idUser = request.params.id
  const fileContent = JSON.parse(fs.readFileSync('./app/user/users.json', 'utf8'))
  fileContent.forEach((users, index) => {
    if (users.id === Number(idUser)) {
      fileContent.splice(index, 1)
    }
  })
  fs.writeFileSync('./app/user/users.json', JSON.stringify(fileContent))
  const posts = JSON.parse(fs.readFileSync('./app/post/post.json', 'utf8'))
  for (let i = posts.length - 1; i >= 0; i--) {
    posts.forEach((post, index) => {
      if (post.userId === Number(idUser)) {
        posts.splice(index, 1)
      }
    })
  }
  fs.writeFileSync('./app/post/post.json', JSON.stringify(posts))
  response.sendStatus(200)
})

router.put('/users/:id', jsonParser, (request, response) => {
  const idUser = request.params.id
  const user = request.body
  const fileContent = JSON.parse(fs.readFileSync('./app/user/users.json', 'utf8'))
  fileContent.forEach((users) => {
    if (users.id === Number(idUser)) {
      users.email = user.email
    }
  })
  fs.writeFileSync('./app/user/users.json', JSON.stringify(fileContent))
  response.sendStatus(200)
})

module.exports = router
