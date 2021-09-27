const { Schema, model } = require('mongoose')


const User = new Schema({
  email: {type: String, unique: true, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  password: {type: String, required: true},
  roles: [{type: String, ref: 'Role'}]

}, {
  versionKey: false,
})

module.exports = model('User', User)
