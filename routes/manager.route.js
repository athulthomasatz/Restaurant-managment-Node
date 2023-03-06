const express = require('express')  
const router = express.Router()
const managerController = require("../controllers/manager.controller")  
const { verifyManagerAuth } = require('../middleware/auth')

router.get('/', managerController.getManagerPage ) 
router.get('/login', managerController.getManagerLoginPage )
router.post('/login',managerController.postManagerLoginPage)
router.get('/signup',managerController.getManagerSignupPage)
router.post('/signup',managerController.postManagerSignupPage)

router.get('/dashboard',verifyManagerAuth, managerController.getManagerDashboard) 


router.get('/addcategory', verifyManagerAuth, managerController.getAddCategoryPage)
router.post('/addcategory', verifyManagerAuth, managerController.postAddCategoryPage)
router.get('/additem', verifyManagerAuth, managerController.getAddItemPage)
router.post('/additem', verifyManagerAuth, managerController.postAddItemPage)

router.get('/category', verifyManagerAuth, managerController.getManagerMenuPage);
router.get('/categories/:categoryName', verifyManagerAuth, managerController.getManagerCategoryPage);



module.exports = router; 






// router.get('/menu',verifyManagerAuth ,managerController.getManagerMenuPage)
// router.get('/menu/add-category',verifyManagerAuth , managerController.getManagerAddCategoryPage)
// router.post('/menu/add-category',verifyManagerAuth , managerController.postManagerAddCategoryPage)
// router.get('/menu/menu-items',verifyManagerAuth , managerController.getManagerMenuItemPage)
// router.get('/menu/add-items',verifyManagerAuth , managerController.getManagerAddItemPage)
// router.post('/menu/add-items',verifyManagerAuth , managerController.postManagerAddItemPage)

// router.get('/logout',verifyManagerAuth , managerController.getManagerLogout)