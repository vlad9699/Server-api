const User = require('../models/Users')
const Role = require('../models/Role')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { secret } = require('../config')

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles
  }
  return jwt.sign(payload, secret, {expiresIn: '24h'})
}

class authController {
  async registration(req, res) {
    try {
      console.log('POST', req.body)
      const { firstName, lastName, email, password } = req.body
      const candidate = await User.findOne({ email })
      if (candidate) {
        return res.status(400).json({ message: 'User with this email is there' })
      }
      const hashPassword = bcrypt.hashSync(password, 7)
      const userRole = await Role.findOne({ value: 'USER' })
      // const user = new User({firstName, lastName, email, password: hashPassword, role: [userRole.value]})
      // await user.save()
      await User.create({ firstName, lastName, email, password: hashPassword, roles: [userRole.value] })
      return res.json({ message: 'User ACCESS' })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Registration error' })
    }
  }

  async login(req, res) {
    try {
      console.log('LOGIN', req.body)
      const { email, password } = req.body
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ message: `${email} not found` })
      }
      const validPassword = bcrypt.compareSync(password, user.password)
      if(!validPassword) {
        return res.status(400).json({ message: `Password is wrong` })
      }

      const token = generateAccessToken(user._id, user.roles)
      return res.json({message: 'ACCESS', token})
    } catch (e) {
      console.log(e)
      res.status(400).json({message: 'Login error'})
    }
  }
}

module.exports = new authController()
