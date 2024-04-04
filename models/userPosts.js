const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    
    Likes:{
        type:String,
        
        
    },

  
    profileId:{
        type:String,
        required:true
        
    },
    userId:{
        type:String,
        required:true
        
    },
    Username:{
        type:String,
        required:true
        
    },
    Profile:{
        type:String,
        default:'vikash.png'
        
    },

    caption:{
        type:String,
        
    },
    image:{
        type:String,
        required:true
    },
    location:{
        type:String,
        
    },
    
    
},
{
    timestamps:true
});

module.exports = mongoose.model('posts',postSchema);