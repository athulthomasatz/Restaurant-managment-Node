const express = require('express')
const router = express.Router()
const cashierController = require("../controllers/cashier.controller")

router.get('/', cashierController.getCashierPage )
router.get('/login', cashierController.getCashierLoginPage )

module.exports = router;