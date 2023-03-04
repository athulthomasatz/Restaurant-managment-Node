const express = require('express')
const router = express.Router()
const staffController = require("../controllers/staff.controller")  
const { verifyStaffAuth } = require('../middleware/auth')
router.get('/', staffController.getStaffPage )
router.get('/staffDash', staffController.getStaffDashboard)
router.get('/login', staffController.getStaffLoginPage )
router.post('/login',staffController.postStaffLoginPage)
router.get('/signup',staffController.getStaffSignupPage)
router.post('/signup',staffController.postStaffSignupPage) 

router.get('/staffDashboard',verifyStaffAuth,staffController.getStaffDashboard) 
router.get('/logout',verifyStaffAuth, staffController.getStaffLogout)

module.exports = router; 