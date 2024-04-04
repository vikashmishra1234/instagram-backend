const follower = require("../models/follower");
const signUp = require("../models/signUp");
const userProfile = require("../models/userProfile");
const Profile = require("../models/userProfile");

exports.getProfile=async(req,res)=>{
try { 
const profile = await Profile.findOne({userId:req.params.userId});
console.log(profile)
if(!profile){
    return res.status(200).json({success:false,error:'profile not found'});
}
return res.json({success:true,Profile:profile})
} catch (error) {
    return res.status(200).json({success:false,error:error.message});

}

}
exports.createProfile=async(req,res)=>{
    try {
        const exit = await Profile.findOne({userId:req.body.userId});
        if(exit){
            return res.statut(200).json({success:false,error:"user profile areadry exits"})
        }
        const userExit=await signUp.findOne({Username:req.body.userName});
        if(!userExit){
            return res.statut(200).json({success:false,error:"user does not exits"})
        }
        const newProfile = await Profile(req.body);
        await newProfile.save();
        console.log("saved")
        console.log(newProfile)
        return res.json({success:true,newProfile:newProfile,message:'profile created successfully'})
    } catch (error) {
        return res.json({success:false,error:error.message})
    }
}

exports.findAdmin=async(req,res)=>{
    try {
        const user = await signUp.findById(req.params.id);
        if(!user){
            return res.status(404).json({success:false,error:"user not found"});
        }
        return res.status(200).json({success:true,admin:user})
    } catch (error) {
        return res.status(500).json({success:false,error:error.message});

    }
}
exports.removeFollow=async(req,res)=>{
    try {
        const condition1 = { adminId:req.body.userId };
        const condition2 = { profileId: req.body.profileId }; 
       
        const exit = await follower.find({ $and: [condition1, condition2] });
       
       
        const profile = await userProfile.findById(req.body.profileId);
        
        const adminProfile = await userProfile.findOne({userId:req.body.userId});
        if(!profile||!adminProfile||exit.length==0){
           
            return res.status(200).json({success:false,error:'profile not found'});
        }
        
        let newfollower=parseInt(profile.follower);
        newfollower=newfollower-1;
        await userProfile.findByIdAndUpdate(req.body.profileId,{follower:newfollower});
        let newfollowing =parseInt(adminProfile.following);
        newfollowing=newfollowing-1;
        await userProfile.findOneAndUpdate({userId:req.body.userId},{following:newfollowing})
        let resp=await follower.deleteOne({profileId:req.body.profileId});
       
        res.json({success:true,message:"follow successful"});
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success:false,error:error.message});

    }
}
exports.addFollower=async(req,res)=>{
    try {
        
        const profile = await userProfile.findById(req.body.profileId);
        const adminProfile = await userProfile.findOne({userId:req.body.userId});
        if(!profile||!adminProfile){
            return res.status(404).json({success:false,error:'profile not found'});
        }
        console.log(req.body.userId)
        let newfollower=parseInt(profile.follower);
        newfollower=newfollower+1;
        await userProfile.findByIdAndUpdate(req.body.profileId,{follower:newfollower});
        let newfollowing =parseInt(adminProfile.following)
        newfollowing=newfollowing+1;
        await userProfile.findOneAndUpdate({userId:req.body.userId},{following:newfollowing})
        await follower.create({
            profileId:req.body.profileId,
            adminId:req.body.userId
        });
        console.log("following")
        res.json({success:true,message:"follow successful"});
    } catch (error) {
        return res.status(500).json({success:false,error:error.message});

    }
}

exports.checkfollow=async(req,res)=>{
    try {
        const condition1 = { adminId:req.body.userId };
        const condition2 = { profileId: req.body.profileId }; 
       
        const exit = await follower.find({ $and: [condition1, condition2] });
        if(exit.length==0){
            return res.status(200).json({success:true,follow:false,message:'not follow'});
        }
        return res.status(200).json({success:true,follow:true,message:'follow each other'})
        
    } catch (error) {
        console.log(error.message);
        res.json({success:false,error:error.message});
    }
}