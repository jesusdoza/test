
module.exports.getProfile=async (req, res)=>{

    res.render('userprofile.ejs',{
        title:'User Profile',
        user:req.user
    })
}
module.exports.getDashboard=async (req, res)=>{

    res.render('dashboard.ejs',{
        title:'Dashboard',
        user:req.user
    })

}