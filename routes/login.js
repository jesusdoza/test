const Router = require('express').Router()
const authController = require('../controllers/auth')


// @route /login/*
// Router.get('/', authController.getLogin)
Router.get('/', authController.getLogin) //todo 
Router.post('/', authController.postLogin) 

Router.get('/signup',authController.getSignup)
Router.post('/signup',authController.postSignup)

// Router.get('/logout',authController.logout)

module.exports = Router