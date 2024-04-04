const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    profileImage:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    follower:{
        type:String,
        required:true
    },
    following:{
        type:String,
        required:true
    },
    posts:{
        type:String,
        required:true
    },
    bio:{
        type:String,
    }
});

module.exports = mongoose.model("profile",profileSchema);