const mongoose = require('mongoose')

const UsersSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    id_card: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    postal: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    sub_district: {
        type: String,
        required: true
    },
},{ timestamps: true })

module.exports = mongoose.model('users', UsersSchema)