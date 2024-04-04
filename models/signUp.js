const mongoose = require('mongoose');

const signUpSchema = mongoose.Schema({
    Profile:{
        type:String,
        default:'img'
    },
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    ConfirmPass:{
        type:String,
        required:true
    },
    Username:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('user',signUpSchema);