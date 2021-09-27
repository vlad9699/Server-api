const Router = require('express')
const router = new Router()
const AuthController = require('../controller/authController')
const UserController = require('../controller/userController')
const { registerValidation } = require('../middleware/validationMiddleware')

router
  .post('/registration',
    registerValidation,
    AuthController.registration)
  .post('/login', AuthController.login)

  .get('/users', UserController.getUsers)

module.exports = router
