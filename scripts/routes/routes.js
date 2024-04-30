const express = require('express');
const router = express.Router();

const {home, signup, login, register, verifyUser, changeUser,logout}  = require('../controller/controller');
const { logAdmin, verifyAdmin, Aprobar } = require('../controller/admincontroll');


router.get('/',home)
router.get('/signup',signup)
router.get('/login',login)
// router.get('/success',success)
//router.get('/panel')
router.get('/logout', logout)
router.get('/admin', logAdmin)


//post

router.post('/register',register)
router.post('/login', verifyUser)
router.post('/adminlog', verifyAdmin)
router.put('/panel', changeUser)
router.put('/aprobar', Aprobar) 

module.exports = router;
