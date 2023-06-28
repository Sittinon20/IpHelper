const express = require("express")
const router = express.Router()
const { requireLogin } = require("../Controllers/UsersController")
const { register, login, GetProfile, UpdateProfile, GetCards, PostCards, UpdateCards, GetCardInfo, DeleteCards, PostForm, GetForm, DeleteForm } = require("../Controllers/UsersController")

router.post('/register', register) 
router.post('/login', login)
router.get('/profile/:email', requireLogin, GetProfile)
router.put('/profile/:email', requireLogin, UpdateProfile)

router.get('/card/:email', requireLogin, GetCards)
router.post('/card', PostCards)
router.put('/cardinfo/:_id', UpdateCards)
router.delete('/cardinfo/:_id', requireLogin, DeleteCards)   
router.get('/cardinfo/:_id', requireLogin, GetCardInfo)

router.post('/form/:_id', PostForm)
router.get('/form/:c_id', requireLogin, GetForm)
router.delete('/form/:c_id', requireLogin, DeleteForm)   


module.exports = router