const { Post, Court } = require('../models')

const PostController = {
  postPost: async (req, res) => {
    const { date, startTime, endTime, cost, requiredPeople, remarks } = req.body
    try {
      const court = await Court.findOne({ name: req.body.court })
      const courtId = court._id
      await Post.create({
        userId: '6182ade1e0e7a001064d2ba1',
        courtId,
        date,
        startTime,
        endTime,
        cost,
        requiredPeople,
        remarks,
      })
      return res.json({ message: 'Successfully created' })
    } catch (err) {
      console.trace(err)
      return res.json({ message: 'Internal Server Error' })
    }
  },
  getPosts: async (req, res) => {
    try {
      const posts = await Post.find()
      return res.json(posts)
    } catch (err) {
      console.trace(err)
      return res.json({ message: 'Internal Server Error' })
    }
  },
  getPost: async (req, res) => {
    const { id } = req.params
    try {
      const post = await Post.findById(id)
      if (!post) return res.json({ message: "post not found" })

      return res.json(post)
    } catch (err) {
      console.trace(err)
      return res.json({ message: 'Internal Server Error' })
    }
  },
  putPost: async (req, res) => {
    const { id } = req.params
    try {
      const court = await Court.findOne({ name: req.body.court })
      const courtId = court._id

      let post = await Post.findById(id)
      post.courtId = courtId
      post = _.merge(post, { ...req.body })
      post.save()
      return res.json({ message: 'Successfully updated' })
    } catch (err) {
      console.trace(err)
      return res.json({ message: 'Internal Server Error' })
    }

  }
}

module.exports = PostController