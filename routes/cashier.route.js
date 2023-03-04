const express = require('express')
const router = express.Router()
const cashierController = require("../controllers/cashier.controller")

router.get('/', cashierController.getCashierPage )
router.get('/login', cashierController.getCashierLoginPage ) 
router.post('/login',cashierController.postCashierLoginPage)
router.get('/signup',cashierController.getCashierSignup)
router.post('/signup',cashierController.postCashierSignup)
router.get('/cashierDashboard',cashierController.getCashierDashboard)
router.get('/logout',cashierController.getCashierLogout)

module.exports = router; 