const express = require('express');
const { SignUp, userLogin, getRecent } = require('../controller/auth');
const upload = require('../upload/upload');
const {addPosts, getImage, updatePost, reactions, getComments, findAllPosts} = require('../controller/addPosts');
const { getUser, updateProfile, updatePostn, getAllPosts, getUsers, uploadProfile } = require('../controller/getUser');
const { getProfile, createProfile, findAdmin, addFollower, checkfollow, removeFollow } = require('../controller/getProfile');
const uploadProfileIm = require('../upload/uploadProfileIm');

const routes = express.Router();

routes.get('/user/:id',getUser);
routes.get('/get/comment/:postId',getComments);
routes.get('/get/profile/:userId',getProfile);
routes.get('/get/allpost/:userId',getAllPosts);
routes.get('/get/allposts/:userId',findAllPosts);
routes.get('/get/admin/:id',findAdmin);
routes.get('/get/post/:id',getRecent);
routes.get('/get/user',getUsers);

routes.put('/update/post/:id',updatePost);
routes.put('/update/profile/:profileId',updateProfile);
routes.put('/update/postno/:profileId',updatePostn);


routes.post('/remove/follower',removeFollow);
routes.post('/follower/check',checkfollow);
routes.post('/add/follower',addFollower);
routes.post('/signup',SignUp);
routes.post('/login',userLogin);
routes.post('/post/reaction',reactions);
routes.post('/create/profile',createProfile);
routes.post('/imgage/upload',upload.single("image"),addPosts);
routes.post('/profile/upload',uploadProfileIm.single("file"),uploadProfile);




module.exports=routes;