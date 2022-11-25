const User=require('../models/user')
const jwt=require('jsonwebtoken')


exports.authentication = (req,res,next)=>{

    const token = req.header('Authorization')
    const user = jwt.verify(token , process.env.JWT_SECRET)
    User.findByPk(user.userId)
    .then(foundUser=>{
        req.user=foundUser;
        next()
    })

}