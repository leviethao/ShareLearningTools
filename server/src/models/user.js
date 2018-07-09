var mongoose = require('mongoose')
var Schema = mongoose.Schema
var UserSchema = new Schema({
  loginName: {type: String, required: true, max: 100},
  password: {type: String, required: true, max: 100},
  power: {type: String, default: 'user', max: 20},
  name: {type: String, required: true, max: 100},
  gender: {type: String, default: 'Nam'},
  avatar: {type: String, default: ''},
  dateOfBirth: {type: Date, default: Date.now()},
  address: {type: String, default: ''},
  phoneNumber: {type: String, default: ''}
})

UserSchema.virtual('url').get(function () {
  return '/user/' + this._id
})

module.exports = mongoose.model('User', UserSchema)
