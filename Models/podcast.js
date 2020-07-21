const validate = require('validator')
const mongoose = require('mongoose')


const podcast = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    tag: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: 'User'
    },
    avatar: {
        type: Buffer
    }



},
    { timestamps: true }
)





const Podcast = mongoose.model("Podcast", podcast);

module.exports = Podcast;