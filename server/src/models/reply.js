var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ReplySchema = new Schema({
  created: {type: Date, default: Date.now()},
  content: {type: String, required: true, min: 1, max: 10000},
  replyer: {type: Schema.ObjectId, ref: 'User', required: true},
  comment: {type: Schema.ObjectId, ref: 'Comment', required: true}
})

var autoPopulateReplyer = function (next) {
  this.populate('replyer')
  next()
}

ReplySchema
  .pre('find', autoPopulateReplyer)
  .pre('findOne', autoPopulateReplyer)
  .pre('findById', autoPopulateReplyer)

module.exports = mongoose.model('Reply', ReplySchema)
