const express = require('express')
const router = express.Router()
const authUtil = require('../../utils/authUtil')

const authenticated = (req, res, next) => {
  return authUtil.authenticated(req, res, next)
}

const applyController = require('../controllers/applyController')
const userController = require('../controllers/userController')
const postController = require('../controllers/postController')

// user
router.post('/users', userController.signUp)
router.post('/users/signin', userController.signIn)
router.get('/users/:id/posts', userController.getUserPosts)
router.get('/users/:id/applies', userController.getUserApplies)
router.get('/users/:id', authenticated, userController.getUser)
router.put('/users/:id', userController.putUser)

// post
router.post('/posts', postController.postPost)
router.get('/posts', postController.getPosts)
router.get('/posts/:id', postController.getPost)
router.put('/posts/:id', postController.putPost)

// apply
router.post('/posts/:post_id/applies', applyController.postApply)
router.get('/posts/:post_id/applies', applyController.getApplies)
router.get('/applies/:id', applyController.getApply)
router.put('/applies/:id', applyController.putApply)

module.exports = router;