var mongoose = require('mongoose')
var Schema = mongoose.Schema
var UserSchema = new Schema({
  loginName: {type: String, required: true, max: 100},
  password: {type: String, required: true, max: 100},
  power: {type: String, default: 'user', max: 20},
  name: {type: String, required: true, max: 100},
  gender: {type: String, default: 'Nam'},
  avatar: {type: String, default: 'images/defaultAvatar.png'},
  dateOfBirth: {type: Date, default: Date.now()},
  address: {type: String, default: ''},
  phoneNumber: {type: String, default: ''},
  notifies: [{type: Schema.Types.ObjectId, ref: 'Notify'}],
  receives: [{type: Schema.Types.ObjectId, ref: 'Exchange'}],
  provides: [{type: Schema.Types.ObjectId, ref: 'Exchange'}]
})

UserSchema.virtual('url').get(function () {
  return '/user/' + this._id
})

module.exports = mongoose.model('User', UserSchema)
