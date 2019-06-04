const express = require('express')

const db = require('./db')

const router = express.Router()

router.get('/', async(req, res) => {
    try {
        const posts = await db.find()
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({
            error: 'The posts information could not be retrieved'
        })
    }
})

router.get('/:id', async(req, res) => {
    try {
        const post = await db.findById(req.params.id)
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'The post information could not be retrieved'
        })
    }
})

router.post('/', async(req, res) => {
    try {
        const post = await db.insert(req.body)
        if(req.body.title && req.body.contents) {
            res.status(201).json(post)
        } else {
            res.status(400).json({
                errorMessage: "Please provide title and contents for the post." 
            })
        }
    } catch (error) {
        res.status(500).json({
            error: "There was an error while saving the post to the database",
            data: req.body
        })
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const post = await db.remove(req.params.id)
        if(post) {
            res.status(204).json({
                message: 'The post has been deleted'
            })
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
    } catch(error) {
        res.status(500).json({
            error: "The post could not be removed"
        })
    }
})

module.exports = router