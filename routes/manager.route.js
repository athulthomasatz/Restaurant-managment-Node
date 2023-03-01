const express = require('express')
const router = express.Router()
const managerController = require("../controllers/manager.controller")

router.get('/', managerController.getManagerPage ) 
router.get('/login', managerController.getManagerLoginPage )
router.get('/menu',managerController.getManagerMenuPage)
router.get('/menu/add-category', managerController.getManagerAddCategoryPage)
router.post('/menu/add-category', managerController.postManagerAddCategoryPage)
router.get('/menu/menu-items', managerController.getManagerMenuItemPage)
router.get('/menu/add-items', managerController.getManagerAddItemPage)
router.post('/menu/add-items', managerController.postManagerAddItemPage)

module.exports = router; 