const passport = require('passport')

const validator = require('validator') 
const User = require('../models/User') //new user gets put in user collection

/// get login
 exports.getLogin = (req, res) => { // todo
    if (req.user) {
      return res.redirect('/repair')// already authenticated send user to 
    }
    res.render('login', {
      title: 'Login'
    })
  }
  
  ///login post
  exports.postLogin = (req, res, next) => {
    const validationErrors = []
    console.log(req.body)
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('/login')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err) }
      if (!user) {
        req.flash('errors', info)
        return res.redirect('/login')
      }
      req.logIn(user, (err) => {
        if (err) { return next(err) }
        req.flash('success', { msg: 'Success! You are logged in.' })
        res.redirect(req.session.returnTo || '/repair')
      })
    })(req, res, next)
  }
  
  /// logout
  exports.logout = (req, res) => {
    console.log(`logout route`)
    
    req.logout((err) => {

      if(err)return next (err);

      console.log('User has logged out.')
      req.session.destroy((err) => {
        if (err) console.log('Error : Failed to destroy the session during logout.', err)
        req.user = null
        res.redirect('/')
      })
    })
  }
  
  exports.getSignup = (req, res) => {
    if (req.user) {
      return res.redirect('/')
    }
    res.render('signup', {
      title: 'Create Account'
    })
  }
  
/// signup
  exports.postSignup = (req, res, next) => { //checking to see if password ect match

    console.log(`signup body`,req.body)
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
    if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('../signup')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  

    const user = new User({  //new User is our user model, we grab username,email, password from request body of the form to create a new user
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
  
    User.findOne({$or: [
      {email: req.body.email},
      {username: req.body.username}
    ]}, (err, existingUser) => {
      if (err) { return next(err) }
      if (existingUser) {
        req.flash('errors', { msg: 'Account with that email address or username already exists.' })
        return res.redirect('../signup')
      }

      user.save((err) => {//save the new user model to create a new user in our users collection
        if (err) { return next(err) }
        req.logIn(user, (err) => {
          if (err) {
            return next(err)
          }

          res.redirect('/repair') //last thing it does is redirect us to the dashboard
        })
      })
    })
  }