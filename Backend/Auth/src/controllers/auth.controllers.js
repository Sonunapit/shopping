const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const redis = require("../db/redis")

async function registerUser(req,res){
    const {username,email,password,fullName:{firstName,lastName}} = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            {username},
            { email }
        ]
    });
    if (isUserAlreadyExists){
        return res.status(409).json({message:"User or Email already exists"})
    }

    const hash = await bcrypt.hash(password, 10);


    const user = await userModel.create({
     username,
     email,
     password:hash,
     fullName:{firstName, lastName}
    })
    
 const token = jwt.sign(
  {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role
  },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }   
);

    res.cookie("token",token,{
        httpOnly: true,
        secure: true,
        sameSite: "None",  
        maxAge: 24*60*60*1000
    })

    res.status(201).json({
        message:"User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
            addresses: user.addresses
        }
    })

}

async function loginUser(req, res) {
  const { email, password } = req.body;

  // 1. User dhundo
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // 2. Password compare karo
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // 3. Token banao
  const token = jwt.sign(
    { id: user._id, username: user.username, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  // 4. Cookie me bhejo
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000
  });

  res.status(200).json({
    message: "Login successful",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      role: user.role
    }
  });
}

async function getCurrentUser(req,res){
  return res.status(200).json({
    message:"Current user fetched successfuly",
    user: req.user
  })
}

async function logoutUser(req,res){
  const token = req.cookies.token;
  if(token){
    await redis.set(`blacklist:${token}`,'true','EX', 24 * 60 * 60);
  }
  res.clearCookie('token',{
    httpOnly:true,
    secure: true
  })
  return res.status(200).json({message:"logged out successfully"})
}

module.exports = {
    registerUser, loginUser, getCurrentUser,logoutUser
}