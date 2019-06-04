const express = require('express')

const db = require('../data/db')

const router = express.Router()

router.get('/:id/comments', async(req, res) => {
    try {
        const comment = await db.findPostComments(req.params.id)
        if(comment) {
            res.status(200).json(comment)
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
    } catch (error) {
        res.status(500).json({
            error: "The comments information could not be retrieved." 
        })
    }
})

router.post('/:id/comments', async(req, res) => {
    try {
        const comment = await db.insertComment(req.body)
        if(req.params.id) {
            if(comment.text) {
                res.status(201).json({comment})
            } else {
                res.status(400).json({
                    errorMessage: "Please provide text for the comment."
                })
            }
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
    } catch (error) {
        res.status(500).json({
            error: "There was an error while saving the comment to the database",
            id: req.params
        })
    }
})

module.exports = router