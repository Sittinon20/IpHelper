const mongoose = require('mongoose')

const FormSchema = mongoose.Schema({
        c_id: {
            type: String
        },
        f_check: {
            type: String
        },
        f1_type: {
            type: String
        },
        f1_name: {
            type: String
        },
        f1_address: {
            type: String
        },
        f1_province: {
            type: String
        },
        f1_postal: {
            type: String
        },
        f1_district: {
            type: String
        },
        f1_sub_district: {
            type: String
        },
        f1_tel: {
            type: String
        },
        f1_email: {
            type: String
        },
        f1_idcard: {
            type: String
        },
        f2_check: {
            type: String
        },
        f2_type: {
            type: String
        },
        f2_name: {
            type: String
        },
        f2_address: {
            type: String
        },
        f2_province: {
            type: String
        },
        f2_postal: {
            type: String
        },
        f2_district: {
            type: String
        },
        f2_sub_district: {
            type: String
        },
        f2_email: {
            type: String
        },
        f2_idcard: {
            type: String
        },
        f3_check: {
            type: String
        },
        f3_name: {
            type: String
        },
        f3_address: {
            type: String
        },
        f3_province: {
            type: String
        },
        f3_postal: {
            type: String
        },
        f3_district: {
            type: String
        },
        f3_sub_district: {
            type: String
        },
        f3_email: {
            type: String
        },
        f3_tel: {
            type: String
        },
        f3_idcard: {
            type: String
        },
        f3_id: {
            type: String
        },
},{ timestamps: true })

module.exports = mongoose.model('form', FormSchema)