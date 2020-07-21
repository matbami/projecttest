const express = require('express')
const User = require('../Models/User')
const router = new express.Router()


//SIGNUP ROUTE
router.post('/signup', async (req, res) => {
    const user = new User(req.body)
    try {


        if (!user.name || !user.email || !user.password) {
            return res.status(400).send('Please fill required links')
        }

        const email = user.email;
        const uniqueuser = await User.findOne({ email })
        if (uniqueuser) {
            return res.status(400).send(`${email} is already registered`)
        }
        await user.save()
        const token = await user.generateAuthToken()
        res.send({ user, token })

    } catch (error) {
        res.status(400).send(error)

    }
})


//LOGIN ROUTE
router.post('/login', async (req, res) => {


    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    }
    catch (e) {

        res.status(400).send("fail")
    }
})


module.exports = router