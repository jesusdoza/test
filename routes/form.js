
// packages
const express = require('express')
const router = express.Router();
const formController = require("../controllers/form")
const { ensureAuth } = require('../middleware/auth')

// repair form page
router.get('/repairform',ensureAuth, async (req, res)=>{

    res.render('repairform.ejs',{title:"Repair Submission",user:req.user});
})

// sign repair form
router.get('/repairform/sign',ensureAuth, async (req, res)=>{

    res.render('repairform.ejs',{title:"Repair Submission",user:req.user});
})




module.exports = router;