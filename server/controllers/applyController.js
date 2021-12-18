const Apply = require('../models/apply')

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
      console.trace(err)
      return res.json({ message: 'Internal Server Error' })
    }
  },
  getApplies: async (req, res) => {
    try {
      const applies = await Apply.find()
      return res.json(applies)
    } catch (err) {
      console.trace(err)
      return res.json({ message: 'Internal Server Error' })
    }
  },
  getApply: async (req, res) => {
    const { id } = req.params
    try {
      const apply = await Apply.findById(id)
      return res.json(apply)
    } catch (err) {
      console.trace(err)
      return res.json({ message: 'Internal Server Error' })
    }
  },
  putApply: async (req, res) => {
    try {
      let apply = await Apply.findById(req.params.id)
      apply = _.merge(apply, { ...req.body })
      apply.save()
      return res.json({ message: 'Successfully updated' })
    } catch (err) {
      console.trace(err)
      return res.json({ message: 'Internal Server Error' })
    }
  }
}

module.exports = applyController