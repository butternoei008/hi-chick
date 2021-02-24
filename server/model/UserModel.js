const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
   name: String,
   time: Number,
   avatar: String,
})

module.exports = mongoose.model('User', userSchema)