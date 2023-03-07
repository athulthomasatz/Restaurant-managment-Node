const express = require('express')
const router = express.Router() 
const guestController = require('../controllers/guest.controller') 


router.get('/',guestController.getWelcomePage)

router.get('/menu',guestController.getGuestMenu)

router.get('/menu/:categoryName',guestController.getGuestItems)



module.exports = router;