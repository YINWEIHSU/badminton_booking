const { Post, User, Apply } = require('../models')
const bcrypt = require('bcryptjs')
const { jwtUtil } = require('../../utils/jwtUtil')
const { request } = require('express')

const userController = {
  signUp: async (req, res) => {
    const { email, name, password, checkPassword } = req.body

    if (!email || !name || !password || !checkPassword) {
      return res.json({ message: 'input cannot be blank' })
    }

    if (checkPassword !== password) {
      return res.json({ message: 'Password is different' })
    }

    try {
      const user = await User.findOne({ email })
      if (user) return res.json({ message: 'Email is already exists', })

      // const { name, email, password } = req.body

      await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
      })
      return res.json({ status: 'success', message: 'User was successfully registered' })
    } catch (err) {
      console.trace(err)
      return res.json({ message: 'Internal Server Error' })
    }
  },
  signIn: async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
      return res.json({ message: "required fields didn't exist" })
    }

    try {
      const user = await User.findOne({ email })
      if (!user) return res.json({ message: "user not found" })
      if (!bcrypt.compareSync(password, user.password)) return res.json({ message: "password is not correct" })

      res.json({
        status: 'success',
        message: 'ok',
        token: jwtUtil.generateJWT(user.id)
      })
    } catch (err) {
      console.trace(err)
      res.json({ message: 'Internal Server Error' })
    }
  },
  getUserPosts: async (req, res) => {
    const { id } = req.params

    try {
      const post = await Post.find({ userId: id })
      if (!post) return res.json({ message: "post not found" })

      return res.json(post)
    } catch (err) {
      console.trace(err)
      return res.json({ message: 'Internal Server Error' })
    }
  },
  getUserApplies: async (req, res) => {
    const { id } = req.params

    try {
      const reply = await Apply.find({ userId: id })
      if (!reply) return res.json({ message: "reply not found" })

      return res.json(reply)
    } catch (err) {
      console.trace(err)
      return res.json({ message: 'Internal Server Error' })
    }
  },
  getUser: async (req, res) => {
    const { id } = req.params
    try {
      const user = await User.findById(id)
      if (!user) return res.json({ message: "user not found" })

      return res.json(user)
    } catch (err) {
      console.trace(err)
      return res.json({ message: 'Internal Server Error' })
    }
  },
  putUser: async (req, res) => {
    const { id } = req.params
    try {
      let user = await User.findById(id)
      if (!user) return res.json({ message: "user not found" })

      user = _.merge(user, { ...req.body })
      user.save()
      return res.json(user)
    } catch (err) {
      console.trace(err)
      return res.json({ message: 'Internal Server Error' })
    }
  }
}

module.exports = userController