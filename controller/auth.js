const User = require('../models/signUp');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userPosts = require('../models/userPosts');


let secretKey = 'vikashmishra123';
exports.SignUp = async(req,res)=>{
    const {Email,Password,Name,Username}=req.body;
    try {
        if(!Email||!Password||!Name||!Username){
            return res.json({success:false,error:"enter all the fields"});
        }
        const exits = await User.findOne({Email:req.body.Email});
        
        if(exits){
            return res.status(200).json({success:false,error:'user already exits'});
        }
        
   
        
        const salt =  bcrypt.genSaltSync(10);
        const hashPass =  bcrypt.hashSync(req.body.Password,salt);
      
        const newUser = await User.create({
            Name:req.body.Name,
            Email:req.body.Email,
            Password:hashPass,
            Username:req.body.Username,
            ConfirmPass:req.body.ConfirmPass
        });
        const data = {
            id:newUser._id,
            name:newUser.name
        }
        const token = await jwt.sign({ data }, secretKey,{expiresIn:4*60});
      
      return res.status(200).json({success:true,token:token,user:newUser,message:'SignUp successfull'});
    } catch (error) {
        return res.status(200).json({success:false,error:error.message});

    }
}

exports.userLogin=async(req,res)=>{
    try {
        const exits = await User.findOne({Username:req.body.Username});
        
        if(!exits){
            return res.status(200).json({success:false,error:'Please SignUp'});
        }
        const passCompare = bcrypt.compareSync(req.body.Password,exits.Password);
        if(!passCompare){
            return res.status(200).json({success:false,error:'Invalid Password'});
        }
        const data = {
            id:exits._id,
            name:exits.Name
        }
        const token = await jwt.sign({ data }, secretKey,{expiresIn:"2h"});
        //res.cookie("jwtoken",token);
        return res.status(200).json({success:true,token:token,user:exits,message:'Login successfull'});


    } catch (error) {
        return res.status(500).json({success:false,error:error.message});
    }
}

exports.getRecent=async(req,res)=>{
   
    try {
        const {id} = req.params;
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
        const posts=await userPosts.find({userId:id,createdAt: { $gte: today } });
        if(!posts){
            return res.status(200).json({success:false,error:"not posts available"});
        }
        return res.status(200).json({success:true,posts:posts});
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success:false,error:error.message});

    }
}