const verifyToken = require("../middlewhere/verifyToken");
const follower = require("../models/follower");
const reactions = require("../models/reactions");
const signUp = require("../models/signUp");
const userPosts = require("../models/userPosts");
const Post = require("../models/userPosts");
const userProfile = require("../models/userProfile");
exports.addPosts = async (req, res) => {
 // res.redirect('/')
  let image = req.file.filename;
  try {
      const profile = await userProfile.findOne({userId:req.body.userId});
    if (!image || !profile) {
      return res.status(404).json({ success: false, error: "image not found" });
    }
    let newPost = await Post.create({
      Likes: req.body.Likes,
      userId: req.body.userId,
      Username: req.body.Username,
      Profile: req.body.Profile,
      caption: req.body.caption,
      image: image,
      location: req.body.location,
      profileId:profile._id
    });
  
    return res.json({
      success: true,
      recent: [newPost],
      message: "Posted Succesfully",
    });
  } catch (error) {
    return res.status(404).json({ success: false, error: error.message });
  }
};
exports.getImage = async (req, res) => {
  const find = await Post.findOne({});
  if (find) {
    return res.json({ success: true, posts: find });
  }
};

exports.updatePost = async (req, res) => {
  try {
    let exits = await Post.findById(req.params.id);
    if (!exits) {
      return res.json({ success: false, error: "not found" });
    }
    
    console.log(req.body)
    let posts = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: true,
    });
    return res.status(200).json({
      success: true,
      message: "updated successfully",
      updatedPost: posts,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.reactions = async (req, res) => {
  try {
    let { postId } = req.body;
    const User = await signUp.findOne({ Username: req.body.userName });
    const postExit = await Post.findById(postId);
    if (!User || !postExit) {
      return res
        .status(404)
        .json({ success: false, error: "post or user not exits" });
    }
    const newReaction = await reactions(req.body);
    await newReaction
      .save()
      .then(() => {
        return res
          .status(200)
          .json({ success: true, message: "reaction added suceess" });
      })
      .catch((err) => {
        return res.status(200).json({ success: false, error: err.message });
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "something went wrong" });
  }
};

exports.getComments = async (req, res) => {
  const exits = await Post.findById(req.params.postId);
  if (!exits) {
    return res.status(404).json({ success: false, error: "post not found" });
  }
  const comments = await reactions.find({ postId: exits._id });
  return res.status(200).json({
    Comments: comments,
    success: true,
    message: "commets found sucesful",
  });
};

exports.findAllPosts = async (req, res) => {
  const Following = [];
  const allPosts = [];

  const getPosts = async (Following) => {
    const posts = [];
    const documentsByUser = [];
   
    for (const userId of Following) {
     let documents = await userPosts.find({ profileId: userId });
      
      documentsByUser.push(documents)
    }
    
    return documentsByUser;
  };

  try {
    
    const Follow = await follower.find({ adminId: req.params.userId });

   
    if (Follow.length == 0) {
      console.log("following empty");
      return res.json({
        success: false,
        error: "this user do not follow any one",
      });
    }
    await Follow.map((following) => Following.push(following.profileId));
    if (Following.length == 0) {
      console.log("Following empty");
    } else {
        
      let newpos = await getPosts(Following);
    let pos= newpos.flat()
      return res
        .status(200)
        .json({ POST: pos, success: true, message: "post found successfully" });
    }
  } catch (error) {
    console.log(error.message);
  }
};
