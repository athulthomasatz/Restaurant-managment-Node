const express = require('express') 
const router = express.Router()
const adminController = require("../controllers/admin.controller")
const { verifyAdminAuth } = require('../middleware/auth')

router.get('/', adminController.getAdminPage )
router.get('/login', adminController.getAdminLoginPage ) 
router.post('/login',adminController.postAdminloginPage)
router.get('/verifyStaff',verifyAdminAuth,adminController.getStaffVerifyPage) 
router.post('/verifyStaff/:id',verifyAdminAuth,adminController.postStaffVerifyById)

module.exports = router; 