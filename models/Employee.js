const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userDetail = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    designation: {
        type: String
    },
    isonboarded: {
        type: Boolean
    },
    topics: {
        type: Array
    }
}, {timestamps: true})

const UserDetail = mongoose.model('Users', userDetail)
module.exports = UserDetail