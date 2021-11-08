const Post = require('../models/post')
const User = require('../models/user')
const Apply = require('../models/apply')
const bcrypt = require('bcryptjs')

const userController = {
  signUp: async (req, res) => {
    try {
      if (!req.body.email || !req.body.name || !req.body.password || !req.body.checkPassword) {
        return res.json({ message: 'input cannot be blank' })
      }
      if (req.body.checkPassword !== req.body.password) {
        return res.json({ message: 'Password is different' })
      }

      const user = await User.findOne({ email: req.body.email })
      if (user) return res.json({ message: 'Email is already exists', })

      const { name, email, password } = req.body

      await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
      })
      return res.json({ status: 'success', message: 'User was successfully registered' })
    } catch (err) {
      console.log(err)
      return res.json({ message: 'Internal Server Error' })
    }
  },
  signIn: async (req, res) => {
    try {
      if (!req.body.email || !req.body.password) {
        return res.json({ message: "required fields didn't exist" })
      }

      const { email, password } = req.body
      const user = await User.findOne({ email: email })

      if (!user) return res.json({ message: "user not found" })

      if (!bcrypt.compareSync(password, user.password)) return res.json({ message: "password is not correct" })

      res.json({
        status: 'success',
        message: 'ok',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          nickname: user.nickname
        }
      })
    } catch (err) {
      console.log(err)
      res.json({ message: 'Internal Server Error' })
    }
  },
  getUserPosts: (req, res) => {
    Post.find({ userId: req.params.id })
      .then(posts => {
        return res.json(posts)
      })
      .catch(err => {
        console.log(err)
        return res.json({ message: 'Internal Server Error' })
      })
  },
  getUserApplies: (req, res) => {
    Apply.find({ userId: req.params.id })
      .then(replies => {
        return res.json(replies)
      })
      .catch(err => {
        console.log(err)
        return res.json({ message: 'Internal Server Error' })
      })
  },
  getUser: (req, res) => {
    User.findById(req.params.id)
      .then(user => {
        return res.json(user)
      })
      .catch(err => {
        console.log(err)
        return res.json({ message: 'Internal Server Error' })
      })
  },
  putUser: (req, res) => {
    User.findById(req.params.id)
      .then(user => {
        const { test, name, nickname, phone, lineId, email, password } = req.body
        user.name = name || user.name
        user.nickname = nickname || user.nickname
        user.phone = phone || user.phone
        user.lineId = lineId || user.lineId
        user.email = email || user.email
        user.password = password || user.password
        user.save()
        return res.json(user)
      })
      .catch(err => {
        console.log(err)
        return res.json({ message: 'Internal Server Error' })
      })
  }
}

module.exports = userController