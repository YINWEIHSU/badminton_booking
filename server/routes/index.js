const express = require('express');
const router = express.Router();
const Post = require('../models/post')

/* GET home page. */
router.get('/', (req, res, next) => {
  Post.find()
    .lean()
    .then(posts => {
      res.send(posts)
    })
    .catch(err => console.log(err))
});

module.exports = router;
