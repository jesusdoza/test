const router =  require('express').Router()
const signature = require('../modules/signuploadform')




//get signature for upload form
router.get('/signform',async (request, response)=>{
    
    const sig = signature.signuploadform();
    console.log(`signform signature received `, sig)

    try{
        response.status(200).json({
            signature: sig.signature,
            timestamp: sig.timestamp,
            cloudname: process.env.cloud_name,
            apikey: process.env.cloud_key,
            folder:process.env.cloud_folder,
        })
    }catch(error){
    } 
})

module.exports= router;