const signUp = require("../models/signUp");
const User = require("../models/signUp");
const userPosts = require("../models/userPosts");
const userProfile = require("../models/userProfile");
const Profile = require("../models/userProfile");

exports.getUser = async(req,res)=>{
   try {
    const user = await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({success:false,message:'found not user !'});
    }
 
    return res.status(200).json({success:true,user:user,message:'found user !'});

   } catch (error) {
    
   }
}
exports.updateProfile=async(req,res)=>{
    try {
        let update = await Profile.findByIdAndUpdate(req.params.profileId,req.body,{
            new:true,
            runValidators:true,
            useFindAndModify:true
        })
        if(!update){
            return res.status(404).json({success:false,error:'profile not found'});
        }
        return res.status(200).json({success:true,message:'profile updated sucessfully'});
    } catch (error) {
        return res.json({success:false,error:error.message})
    }
}
exports.updatePostn=async(req,res)=>{
    try {  
        const profile =  await Profile.findById(req.params.profileId);
        console.log(req.params.profileId)
        console.log(profile)
        if(!profile){
            return res.status(404).json({success:false,error:'can not found profile'});
        }
        let totalPost = parseInt(profile.posts)+1;
        
        const update = await Profile.findByIdAndUpdate(req.params.profileId,{posts:totalPost});
        return res.status(200).json({success:true,message:"post update suceess"});
    } catch (error) {
        return res.json({success:false,error:error.message});
    }
}
exports.getAllPosts=async(req,res)=>{
try {
    const posts =await userPosts.find({userId:req.params.userId});
    if(!posts){
            return res.status(400).json({success:false,error:'no post found'});
    }
    return res.status(200).json({success:true,Posts:posts});
} catch (error) {
    return res.status(404).json({success:false,error:error.message});
}    
}

exports.getUsers=async(req,res)=>{
    try { 
        let keyword = req.query.user;
        const users = await signUp.find({ Username: { $regex: keyword, $options: 'i' } });
       if(!users){
        return res.status(404).json({success:false,error:"No user found with this name"});
       }
       return res.status(200).json({success:true,message:"user found",users:users})
    } catch (error) {


        return res.status(500).json({success:false,error:error.message});
    }
}
exports.uploadProfile=async(req,res)=>{
    try {
        
        
        const image = req.file.filename;
        const data={
            Profile:image
        };
        
        if(!image){
            return res.status(500).json({success:false,error:"image is not uploaded yet"});
        }
        await userPosts.updateMany({userId:req.body.userId},data);
       
     
       await signUp.findByIdAndUpdate(req.body.userId,data);
       await userProfile.findByIdAndUpdate(req.body.profileId,{profileImage:image})
        return res.status(200).json({success:true,message:"profile updated succesfully"});
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success:false,error:error.message});
  
    }
}
