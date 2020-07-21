const mongoose = require('mongoose')
const validate = require('validator')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: 'user'
    }
}, { timestamps: true })

user.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user.id.toString() }, 'thisismyproject')
    // user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}


user.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}

user.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)

    }

    next()

})

const User = mongoose.model("User", user);

module.exports = User;