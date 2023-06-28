const mongoose = require('mongoose')

const CardsSchema = mongoose.Schema({
    email: {
        type: String, 
    },
    c_name: {
        type: String, 
        require: true,
        unique: true
    },
    c_comment: {
        type: String, 
        require: false
    },
    c_type: {
        type: String, 
        require: false, 
    },
    status: {
        type: String,
        default: "รอตอบคำถามแยกประเภท"
    },
},{ timestamps: true })

module.exports = mongoose.model('cards', CardsSchema)