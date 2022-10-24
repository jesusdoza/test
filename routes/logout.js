const Router = require('express').Router()
const authController = require('../controllers/auth')

// @Route /logout
Router.get('/',authController.logout)

module.exports = Router