const mongoose = require('mongoose');

const followerSchema = mongoose.Schema({
    profileId:{
        type:String,
        required:true
    },
    adminId:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('follower',followerSchema);