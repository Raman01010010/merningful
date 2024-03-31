const express = require('express');
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const messageController = require('../controllers/messageController');

const router = express.Router();

router.post('/register1', userController.register1);

router.post('/register', userController.register);

router.post('/cOtp', userController.cOtp);

router.post('/isUser', userController.isUser);

router.post('/post', postController.post);

router.get('/fetchPosts', postController.fetchPosts);

router.get('/fetchUsers', userController.fetchUsers);

router.post('/message', messageController.message);

router.post('/fetchMessage', messageController.fetchMessage);

router.post('/search', postController.search);

router.post('/comment', postController.comment);

router.patch('/updateComment', postController.updateComment);

router.patch('/updateLikes', postController.updateLikes);

router.patch('/likeStatus', postController.likeStatus);

router.get('/fetchComments', postController.fetchComments);

router.post('/searchPost', postController.searchPost);

router.post('/seePost', postController.seePost);

router.post('/fetchProfilePosts', postController.fetchProfilePosts);

module.exports = router;
