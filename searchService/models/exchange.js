const mongoose = require('mongoose')
const Schema = mongoose.Schema
var ExchangeSchema = new Schema({
  provider: {type: Schema.Types.ObjectId, ref: 'User'},
  receiver: {type: Schema.Types.ObjectId, ref: 'User'},
  date: {type: Date, default: Date.now},
  post: {type: Schema.Types.ObjectId, ref: 'Post'}
})

module.exports = mongoose.model('Exchange', ExchangeSchema, 'Exchange')
