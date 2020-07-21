const express = require('express')
const Podcast = require('../Models/podcast')
const router = new express.Router()
const multer = require('multer')

const { auth, auth2 } = require("../Middlewares/auth");



//create podcast 
const upload = multer({

    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }
        cb(undefined, true)
    }
})
router.post('/create', auth, auth2, upload.single('avatar'), async (req, res) => {

    try {
        req.user.avatar = req.file.buffer
        const podcast = new Podcast(req.body)
        await podcast.save()
        res.status(201).send({
            status: "success",
            message: "Podcast uploaded successfully",
            podcast

        })
    } catch (error) {
        console.log(error)
        res.status(400).send(error)

    }
})

router.get('/view', async (req, res) => {

    try {
        const podcast = await Podcast.find({})
        res.status(200).send({
            message: "podcasts retrieved successfully",
            podcast
        })

    } catch (error) {
        res.status(400).send(error)
    }

})


router.patch("podcast/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        const podcast = await Podcast.findByIdAndUpdate(_id)
        if (!podcast) {
            return res.status(404).send("there is no such podcast");
        }
    }
    catch (error) {
        res.status(400).send(error)
    }
})

router.delete('podcast/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const podcast = await Podcast.findByIdAndDelete(_id)
        if (!podcast) {
            return res.status(404).send("there is no such podcast");
        }
    }
    catch (error) {
        res.status(400).send(error)
    }
})


module.exports = router



