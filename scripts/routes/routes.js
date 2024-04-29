const express = require('express');
const router = express.Router();

const {home, signup, login, register, verifyUser, editUser,success, changeUser, getPanel}  = require('../controller/controller');


router.get('/',home)
router.get('/signup',signup)
router.get('/login',login)
router.get('/success',success)
router.get('/panel', editUser)


//post

router.post('/register',register)
router.post('/login',verifyUser)

router.put('/panel', changeUser)

module.exports = router;
