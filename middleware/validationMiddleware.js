// import { check, validationResult } from 'express-validator'
const {check, checkSchema, validationResult} = require('express-validator')

const checkPassword = async (req) => {
  await checkSchema({
    password: {
      notEmpty: {errorMessage: 'Passwordmnot empty'},
      isLength: {
        options: { min: 4, max: 10 },
        errorMessage: 'Password has min 4 max 10 symbols'
      }
    }
  }).run(req)
}

const registerValidation = async (req, res, next) => {
  await checkPassword(req)
  // await check('password', 'Password has min 4 max 10 symbols').isLength({ min: 4, max: 10 }).run(req)
  await check('firstName', 'Name cannot be empty ').notEmpty().run(req)

  const errors = validationResult(req)
  if(!errors.isEmpty()) return  res.status(400).json({message: errors.array()[0]['msg']})
  console.log('check')
  next()
}

module.exports = { registerValidation }
