const cloudinary = require('cloudinary').v2;
require('dotenv').config //! do i need this since already in enviroment???
const apiSecret = process.env.cloud_secret;

// Server-side function used to sign an upload 
const signuploadform = () => {
  const timestamp = Math.round((new Date).getTime()/1000);
  const signature = cloudinary.utils.api_sign_request({
    timestamp: timestamp,
    // eager: 'c_pad,h_300,w_400|c_crop,h_200,w_260',
    folder: process.env.cloud_folder  //has to match on client side too
  }, apiSecret);
  return { timestamp, signature }
}


//exporting this particular function
module.exports = {
  signuploadform
}




