const Apply = require('../models/apply')
const User = require('../models/user')
const Post = require('../models/post')


const applyController = {
  postApply: async (req, res) => {
    try {
      const { numberOfPeople, remarks } = req.body
      await Apply.create({
        userId: '6187fe519d2a9f4bdd1aeb5f',
        postId: req.params.post_id,
        numberOfPeople,
        remarks,
      })
      return res.json({ message: 'Successfully created' })
    } catch (err) {
      console.log(err)
      return res.json({ message: 'Internal Server Error' })
    }
  },
  getApplies: (req, res) => {
    Apply.find()
      .then(applies => {
        return res.json(applies)
      })
      .catch(err => {
        console.log(err)
        return res.json({ message: 'Internal Server Error' })
      })
  },
  getApply: (req, res) => {
    Apply.findById(req.params.id).then(apply => {
      return res.json(apply)
    }).catch(err => {
      console.log(err)
      return res.json({ message: 'Internal Server Error' })
    })
  },
  putApply: async (req, res) => {
    try {
      const { numberOfPeople, remarks, isConfirmed } = req.body

      const apply = await Apply.findById(req.params.id)
      apply.numberOfPeople = numberOfPeople
      apply.remarks = remarks
      apply.isConfirmed = isConfirmed
      apply.save()

      return res.json({ message: 'Successfully updated' })
    } catch (err) {
      console.log(err)
      return res.json({ message: 'Internal Server Error' })
    }
  }
}

module.exports = applyController