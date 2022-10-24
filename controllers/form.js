const signature = require('../modules/signuploadform')
const router =  require('express').Router()


module.exports={
    getForm:async (req, res)=>{
        res.render('repairform.ejs',{title:"Repair Submission",user:req.user});
    },


    signForm:async (req, res)=>{
        
      //todo get signature and respond
      const sig = signature.signuploadform();
      console.log(`signform signature received `, sig)
  
      try{
          res.status(200).json({
              signature: sig.signature,
              timestamp: sig.timestamp,
              cloudname: process.env.cloud_name,
              apikey: process.env.cloud_key,
              folder:process.env.cloud_folder
          })
      }catch(error){
      } 
    }


}
