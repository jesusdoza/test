
const router =  require('express').Router()


module.exports={
    getHome:async (request, response)=>{

        response.render('home.ejs');
    },

}