const express = require('express')
const fs = require('fs')
const router = express.Router()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

router.get('/posts/user/:userId/', (request, response) => {
  const fileContent = fs.readFileSync('./app/post/post.json', 'utf8')
  const posts = JSON.parse(fileContent)
  const id = request.params.userId
  const post = []
  posts.forEach((el) => {
    if (el.userId === Number(id)) {
      post.push(el)
    }
  })
  response.send(post)
})

router.post('/posts/user/:userId', jsonParser, (request, response) => {
  if (request.body) {
    let maxId
    const post = request.body
    const posts = JSON.parse(fs.readFileSync('./app/post/post.json', 'utf8'))
    const userId = request.params.userId
    posts.forEach((post) => {
      if (!post.id) { post.id = 0 }
      maxId = Math.max(post.id)
    })
    post.id = maxId + 1
    post.userId = Number(userId)
    posts.push(post)
    fs.writeFileSync('./app/post/post.json', JSON.stringify(posts))
    response.send(post)
  } else {
    return response.sendStatus(400)
  }
})

router.delete('/posts/:id', (request, response) => {
  const idPost = request.params.id
  const fileContent = JSON.parse(fs.readFileSync('./app/post/post.json', 'utf8'))
  fileContent.forEach((posts, index) => {
    if (posts.id === Number(idPost)) {
      fileContent.splice(index, 1)
    }
  })
  fs.writeFileSync('./app/post/post.json', JSON.stringify(fileContent))
  response.sendStatus(200)
})

router.put('/posts/:id', jsonParser, (request, response) => {
  const idPost = request.params.id
  const post = request.body
  const fileContent = JSON.parse(fs.readFileSync('./app/post/post.json', 'utf8'))
  fileContent.forEach((posts) => {
    if (posts.id === Number(idPost)) {
      posts.title = post.title
    }
  })
  fs.writeFileSync('./app/post/post.json', JSON.stringify(fileContent))
  response.sendStatus(200)
})

module.exports = router
