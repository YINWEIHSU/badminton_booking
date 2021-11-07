const Post = require('../models/post')
const Court = require('../models/court')

const PostController = {
  postPost: async (req, res) => {
    try {
      const { date, startTime, endTime, cost, requiredPeople, remarks } = req.body
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
      console.log(err)
      return res.json({ message: 'Internal Server Error' })
    }
  },
  getPosts: (req, res) => {
    Post.find()
      .then(posts => {
        return res.json(posts)
      })
      .catch(err => {
        console.log(err)
        return res.json({ message: 'Internal Server Error' })
      })
  },
  getPost: (req, res) => {
    Post.findById(req.params.id).then(post => {
      return res.json(post)
    }).catch(err => {
      console.log(err)
      return res.json({ message: 'Internal Server Error' })
    })
  },
  putPost: async (req, res) => {
    try {
      const id = req.params.id
      const { date, startTime, endTime, cost, requiredPeople, remarks } = req.body
      const court = await Court.findOne({ name: req.body.court })
      const courtId = court._id

      const post = await Post.findById(id)
      post.courtId = courtId
      post.date = date
      post.startTime = startTime
      post.endTime = endTime
      post.cost = cost
      post.requiredPeople = requiredPeople
      post.remarks = remarks
      post.save()

      return res.json({ message: 'Successfully updated' })
    } catch (err) {
      console.log(err)
      return res.json({ message: 'Internal Server Error' })
    }

  }
}

module.exports = PostController