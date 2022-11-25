const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const User=require('../models/user');
const { use } = require('../routes/user');

require('dotenv').config()

exports.postSignup= async (req,res,next)=>{

try{
const {name,email,phone,password}=req.body

if( !name || !email || !phone || !password){
    return res.status(400).json({message: "add all fields"})
}

const user=await User.findAll({where:{email}})
if(user.length>0){
    return res.status(409).json({message:'user already exist'})
}

const saltRounds=10;
bcrypt.hash(password, saltRounds, async(err,hash)=>{
  const data=  await User.create({ name , email ,password:hash , phone})
  return res.status(201).json({data,message:'successfully created new user'})

})}

catch(err){
    res.status(500).json(err);}

}


exports.postLogin =async (req,res,next)=>{

    const {email,password} = req.body ;

    try {
        if(!email || !password){
            return res.status(400).json({message:'enter all fields'})
        }
        let user = await User.findOne({where:{email}});
        if(!user){
            return res.status(404).json({message:'User not found'})
        }
        bcrypt.compare(password,user.password , (err, matchPassword)=>{

            console.log("nhai" , password , user.password, matchPassword)
            if(!matchPassword){
                return res.status(401).json({message:'Invalid Password'}) 
                 }

            return res.status(200).json({message:'login sucess' ,token:generateAccessToken(user.id) ,name:user.name
            })
        })

    
    }
    
    catch (err) {
        return res.status(500).json(err)
    }

    function generateAccessToken(id){
        return jwt.sign({ userId : id }, process.env.JWT_SECRET);
    }

}