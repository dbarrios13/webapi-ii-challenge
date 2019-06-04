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

})

module.exports = router