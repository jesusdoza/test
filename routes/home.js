const express = require('express')
// const dataBase = require('../modules/database.js'); //database interface
const { ensureAuth } = require('../middleware/auth')

const router = express.Router();

//controllers
const homeController = require('../controllers/home')

// @route '/'
router.get('/', homeController.getHome)

module.exports = router;

