const users = require("../Models/UsersModel");
const cards = require("../Models/CardsModel");
const form = require("../Models/FormModel");
const jwt = require("jsonwebtoken");
var { expressjwt: expressJWT } = require("express-jwt");

exports.requireLogin = expressJWT({
    secret: "secret123",
    algorithms: ["HS256"],
    userProperty: "auth"
});


/////////////////// USER
exports.register = (req, res) => {
    const { email, password, cpassword, fname, lname, id_card, tel, address, province, postal, district, sub_district } = req.body

    if (password !== cpassword) {
        return res.status(400).json({error: "รหัสผ่านไม่เหมือนกัน"});
    }
    if (password < 8) {
        return res.status(400).json({error: "รหัสผ่านขั้นต่ำ 8 ตัว"});
    }
    if (id_card.toString().length !== 13 || parseInt(id_card) != id_card) {
        return res.status(400).json({error: "เลขประจำตัวประชาชนไม่ถูกต้อง"});
    }
    if (postal.toString().length !== 5 || parseInt(postal) != postal) {
        return res.status(400).json({error: "รหัสไปรษณีย์ไม่ถูกต้อง"});
    }
    
    users.create({ email, password, cpassword, fname, lname, id_card, tel, address, province, postal, district, sub_district }, (err, user) => {
        if (err) {
            return res.status(400).json({error: "อีเมลนี้มีผู้ใช้งานแล้ว"})
        }
        return res.json({message: "สร้างบัญชีผู้ใช้สำเร็จ"})
    })
}

exports.login = (req, res) => {
    
    const { email, password } = req.body

    users.findOne({ email: email, password: password }, (err, user) => {
        if (user) {
            const token = jwt.sign({email},'secret123')
            return res.json({message: "เข้าสู่ระบบสำเร็จ", token, email})
        } else {
            return res.status(400).json({error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง"})
        }
    })
}

exports.GetProfile = (req, res) => {

    var {email} = req.params;

    users.findOne({email}).exec((err, user) => {
        if (user) {
            return res.json(user)
        } else {
            return res.status(400).json({email})
        }
    })
}

exports.UpdateProfile = (req, res) => {

    const {email} = req.params
    const { fname, lname, id_card, tel, address, province, postal, district, sub_district } = req.body

    if (id_card.toString().length !== 13 || parseInt(id_card) != id_card) {
        return res.status(400).json({error: "เลขประจำตัวประชาชนไม่ถูกต้อง"});
    }
    if (postal.toString().length !== 5 || parseInt(postal) != postal) {
        return res.status(400).json({error: "รหัสไปรษณีย์ไม่ถูกต้อง"});
    }

    users.findOneAndUpdate({email}, {fname, lname, id_card, tel, address, province, postal, district, sub_district}, {new: true}).exec((err, user) => {
        if (user) {
            return res.json({message: "อัพเดตข้อมูลสำเร็จ"})
        } else {
            return res.status(400).json({error: "อัพเดตข้อมูลไม่สำเร็จ"})
        }
    })
}

/////////////////// CARD
exports.GetCards = (req, res) => {

    const {email} = req.params;

    cards.find({email}).exec((err, card) => {
        if (card) {
            return res.json(card)
        } else {
            return res.status(400).json({email})
        }
    })
}

exports.GetCardInfo = (req, res) => {
    const {_id} = req.params;

    cards.findOne({_id}).exec((err, card) => {
        if (card) {
            return res.json(card)
        } else {
            return res.status(400).json({_id})
        }
    })
}

exports.PostCards = (req, res) => {

    const { email, c_name, c_comment, c_type } = req.body.data

    cards.create({ email, c_name, c_comment, c_type }, (err, card) => {
        if (err) {
            return res.status(400).json({error: "ชื่อผลงานซ้ำ"})
        }
        return res.json({message: "สร้างผลงานสำเร็จ"})
    })
}

exports.UpdateCards = (req, res) => {

    const { _id } = req.params
    const { c_name, c_comment, c_type, status } = req.body.data

    cards.findOneAndUpdate({_id}, {c_name, c_comment, c_type, status}, {new:true}).exec((err, card) => {
        if (card) {
            return res.json({message: "อัพเดตข้อมูลสำเร็จ"})
        } else {
            return res.status(400).json({error: "ชื่อผลงานซ้ำ"})
        }
    })
}

exports.DeleteCards = (req, res) => {

    const { _id } = req.params

    cards.findOneAndRemove({_id}).exec((err, card) => {
        if (card) {
            return res.json({message: "ลบผลงานสำเร็จ"})
        } else {
            return res.status(400).json({error: "ลบผลงานไม่สำเร็จ"})
        }
    })
}



/////////////////// FORM
exports.PostForm = (req, res) => {

    const { c_id, f1_type, f1_name, f1_address, f1_province, f1_postal, f1_district, f1_sub_district, f1_tel, f1_email, f1_idcard, f_check } = req.body.data
    const { f2_check, f2_type, f2_name, f2_address, f2_province, f2_postal, f2_district, f2_sub_district, f2_email, f2_idcard } = req.body.data
    const { f3_id, f3_check, f3_type, f3_name, f3_address, f3_province, f3_postal, f3_district, f3_sub_district, f3_tel, f3_email, f3_idcard } = req.body.data

    if ((f1_type !== "บุคคลธรรมดา") && (f1_name === "" || f1_address === "" || f1_province === "" || f1_postal === "" || f1_district === "" || f1_sub_district === "" || f1_tel === "" || f1_email === "" || f1_idcard === "" ) ) {
        return res.status(400).json({error: "ใส่ข้อมูลไม่ครบ"});
    }
    if (( (f1_type !== "บุคคลธรรมดา" || f2_type !== "เป็นผู้ประดิษฐ์ / ผู้ออกแบบ") && (f2_check === "false")) && ((f2_name === "" || f2_address === "" || f2_province === "" || f2_postal === "" || f2_district === "" || f2_sub_district === "" || f2_email === "" || f2_idcard === "" )) ) {
        return res.status(400).json({error: "ใส่ข้อมูลไม่ครบ"});
    }
    if ((f3_check === "true") && (f3_name === "" || f3_address === "" || f3_province === "" || f3_postal === "" || f3_district === "" || f3_sub_district === "" || f3_email === "" || f3_tel === "" || f3_idcard === "" || f3_id === "" ) ) {
        return res.status(400).json({error: "ใส่ข้อมูลไม่ครบ"});
    }

    if (( (f1_type !== "บุคคลธรรมดา" || f2_type !== "เป็นผู้ประดิษฐ์ / ผู้ออกแบบ") && (f2_check === "false")) && (f1_idcard.toString().length !== 13 || parseInt(f1_idcard) != f1_idcard) ) {
        return res.status(400).json({error: "เลขประจำตัวประชาชนไม่ถูกต้อง"});
    }
    if (( (f1_type !== "บุคคลธรรมดา" || f2_type !== "เป็นผู้ประดิษฐ์ / ผู้ออกแบบ") && (f2_check === "false")) && (f2_idcard.toString().length !== 13 || parseInt(f2_idcard) != f2_idcard) ) {
        return res.status(400).json({error: "เลขประจำตัวประชาชนไม่ถูกต้อง"});
    }
    if ((f1_type !== "บุคคลธรรมดา" || f2_type !== "เป็นผู้ประดิษฐ์ / ผู้ออกแบบ") && (f3_check == "true") && (f3_idcard.toString().length !== 13 || parseInt(f3_idcard) != f3_idcard) ) {
        return res.status(400).json({error: "เลขประจำตัวประชาชนไม่ถูกต้อง"});
    }
    
    if (( (f1_type !== "บุคคลธรรมดา" || f2_type !== "เป็นผู้ประดิษฐ์ / ผู้ออกแบบ") && (f2_check === "false")) && (f1_postal.toString().length !== 5 || parseInt(f1_postal) != f1_postal) ) {
        return res.status(400).json({error: "รหัสไปรษณีย์ไม่ถูกต้อง"});
    }
    if (( (f1_type !== "บุคคลธรรมดา" || f2_type !== "เป็นผู้ประดิษฐ์ / ผู้ออกแบบ") && (f2_check === "false")) && (f2_check == "false") && (f2_postal.toString().length !== 5 || parseInt(f2_postal) != f2_postal) ) {
        return res.status(400).json({error: "รหัสไปรษณีย์ไม่ถูกต้อง"});
    }
    if ((f1_type !== "บุคคลธรรมดา" || f2_type !== "เป็นผู้ประดิษฐ์ / ผู้ออกแบบ") && (f3_check == "true") && (f3_postal.toString().length !== 5 || parseInt(f3_postal) != f3_postal) ) {
        return res.status(400).json({error: "รหัสไปรษณีย์ไม่ถูกต้อง"});
    }

    if ((f1_type !== "บุคคลธรรมดา" || f2_type !== "เป็นผู้ประดิษฐ์ / ผู้ออกแบบ") && ( f3_check === "" || f1_type === "" || f2_type === "")) {
        return res.status(400).json({error: "ใส่ข้อมูลไม่ครบ"});
    }
    if (f_check === "") {
        return res.status(400).json({error: "ใส่ข้อมูลไม่ครบ"})
    }

    form.create({ c_id, f1_type, f1_name, f1_address, f1_province, f1_postal, f1_district, f1_sub_district, f1_tel, f1_email, f1_idcard, f2_check, f2_type, f2_name, f2_address, f2_province, f2_postal, f2_district, f2_sub_district, f2_email, f2_idcard, f3_id, f3_check, f3_type, f3_name, f3_address, f3_province, f3_postal, f3_district, f3_sub_district, f3_tel, f3_email, f3_idcard, f_check }, (err, form) => {
        if (err) {
            return res.status(400).json({error: "ชื่อผลงานซ้ำ"})
        }
        return res.json({message: "สร้างผลงานสำเร็จ"})
    })
}

exports.GetForm = (req, res) => {

    const {c_id} = req.params

    form.findOne({c_id}).exec((err, form) => {
       if (form) {
           return res.json(form)
       } else {
           return res.status(400).json({c_id})
       }
   })
}

exports.DeleteForm = (req, res) => {

    const { c_id } = req.params

    form.findOneAndRemove({c_id}).exec((err, form) => {
        if (form) {
            return res.json({message: "ลบผลงานสำเร็จ"})
        } else {
            return res.status(400).json({error: "ลบผลงานไม่สำเร็จ"})
        }
    })
}
