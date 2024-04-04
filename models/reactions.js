const mongoose = require('mongoose');

const reactionShema = mongoose.Schema({
    postId:{
        type:String,
        required:true
    },
    Comment:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    Profile:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

module.exports = mongoose.model('reaction',reactionShema);