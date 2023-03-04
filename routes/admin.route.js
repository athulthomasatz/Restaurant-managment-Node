const express = require('express') 
const router = express.Router()
const adminController = require("../controllers/admin.controller")
const { verifyAdminAuth } = require('../middleware/auth')

router.get('/', adminController.getAdminPage )
router.get('/login', adminController.getAdminLoginPage ) 
router.post('/login',adminController.postAdminloginPage)
router.get('/dashboard',verifyAdminAuth,adminController.getAdminDashboard)

router.get('/verifyStaff',verifyAdminAuth,adminController.getStaffVerifyPage) 
router.post('/verifyStaff/:id',verifyAdminAuth,adminController.postStaffVerifyById)

router.get('/verifyCashier',verifyAdminAuth,adminController.getCashierVerifyPage)
router.post('/verifyCashier/:id',verifyAdminAuth,adminController.postCashierVerifyById)

router.get('/verifyManager',verifyAdminAuth,adminController.getManagerVerifyPage)
router.post('/verifyManager/:id',verifyAdminAuth,adminController.postManagerVerifyById)

router.get('/logout',verifyAdminAuth,adminController.getLogoutAdmin)

module.exports = router;  