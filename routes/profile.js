const express = require('express')
const { ensureAuth } = require('../middleware/auth')

const router = express.Router();

//controllers
const profileController = require('../controllers/profile.js')

//@profile/
router.get('/',ensureAuth,profileController.getProfile)
router.get('/dashboard',ensureAuth,profileController.getDashboard)




module.exports = router;

