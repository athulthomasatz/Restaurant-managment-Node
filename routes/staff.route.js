const express = require('express')
const router = express.Router()
const staffController = require("../controllers/staff.controller")

router.get('/', staffController.getStaffPage )
router.get('/login', staffController.getStaffLoginPage )
router.post('/login',staffController.postStaffLoginPage)
router.get('/signup',staffController.getStaffSignupPage)
router.post('/signup',staffController.postStaffSignupPage) 

module.exports = router;