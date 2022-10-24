
const Router = require('express').Router()
const authController = require('../controllers/auth')


// @route /signup/*
Router.get('/',authController.getSignup)
Router.post('/',authController.postSignup)

module.exports = Router
