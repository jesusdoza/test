// import packages
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const logger = require('morgan')
const flash = require('express-flash')
const passport = require('passport')
const session = require('express-session') //enables them to stay logged in 
const MongoStore = require('connect-mongo')
const mongooseDb= require('./config/dbM')

require('dotenv').config({path:"./config/.env"}); // to use with enviroment variables initializes enviroment vars

require('./config/passport')(passport)

//database collection connection
// const dataBase = require('./modules/database.js').connect();
mongooseDb()
const app = express();
const PORT = 8000;

app.set('view engine', 'ejs'); 
app.use(flash())
app.use(require('./middleware/httpsRedirect').httpsRedirect)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true})); //get body data
app.use(logger('dev'))
app.use(express.static('public')) 

// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ 
        mongoUrl: process.env.connect_string,
        }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())




// routes files
// const repairInfoRoutes = require('./routes/repairInfoRoutes')
const signformRoutes = require('./routes/signformRoutes')
const formRoutes = require('./routes/form')
const repairRoutes = require('./routes/repairRoutes')
const loginRoutes = require('./routes/login')
const logoutRoutes = require('./routes/logout')
const signUpRoutes = require('./routes/signup')
const homeRoutes = require('./routes/home')
// const profileRoutes = require('./routes/profile')

// =============================================================
// ROUTES
app.use('/', homeRoutes) 
app.use('/login', loginRoutes)
app.use('/logout', logoutRoutes)
app.use('/signup', signUpRoutes) 
app.use('/repair', repairRoutes) 
// app.use('/profile',profileRoutes)



app.use(formRoutes)
app.use(signformRoutes)


app.listen(process.env.PORT || PORT,()=>{
    console.log(`server runing on port ${PORT}`)
})




