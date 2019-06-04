const express = require('express')

const commentsRouter = require('../data/commentsRouter')
const postRouter = require('../data/postRouter')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    res.send('Welcome to the Server')
})

server.use('/posts', postRouter)
server.use('/posts', commentsRouter)

module.exports = server