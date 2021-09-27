const User = require('../models/Users')
const Role = require('../models/Role')

class userController {
  async getUsers(req,res) {
    try{
      // const userRole = new Role()
      // const adminRole = new Role({value: 'ADMIN'})
      // await userRole.save()
      // await adminRole.save()
      res.json('SERVER WORK')
    } catch (e) {
      console.log(e)
    }
  }
}
module.exports = new userController()
