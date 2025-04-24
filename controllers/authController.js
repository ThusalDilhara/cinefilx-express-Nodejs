const user= require('../models/user');
const jwt=require('jsonwebtoken');


exports.signup=async(req,res)=>{


  try{
    const newUser=await user.create(req.body);

    const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
    

    res.status(201).json({
      status:'success',
      token,
      data:{
        user:newUser
      }
    })
  }
  catch(error){
    res.status(400).json({
      status:'fail',
      message:error.message
    })
  }
}

exports.login=async(req,res)=>{

  try{
    const {email,password}=req.body;  //object destructuring

    //check if email and password exist
    if(!email || !password){
      return res.status(400).json({
        status:'fail',
        message:'Please provide email and password'
      })
    }

    //check if user exists and password is correct
    const user=await user.findOne({email}).select('+password');
    if(!user || !(await user.correctPassword(password,user.password))){
      return res.status(401).json({
        status:'fail',
        message:'Incorrect email or password'
      })
    }

    //if everything is ok, send token to client
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
    
    res.status(200).json({
      status:'success',
      token,
      data:{
        user:user
      }
    })
  }
  catch(error){
    res.status(400).json({
      status:'fail',
      message:error.message
    })
  }
}