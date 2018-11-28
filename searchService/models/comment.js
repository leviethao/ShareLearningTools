var mongoose = require('mongoose')
var Schema = mongoose.Schema
var CommentSchema = new Schema({
  created: {type: Date, default: Date.now},
  content: {type: String, required: true, min: 1, max: 10000},
  commenter: {type: Schema.ObjectId, ref: 'User', required: true},
  post: {type: Schema.ObjectId, ref: 'Post', required: true},
  replies: [{type: Schema.ObjectId, ref: 'Reply'}]
})

var autoPopulate = function (next) {
  this.populate('commenter')
  this.populate('replies')
  next()
}

CommentSchema
  .pre('find', autoPopulate)
  .pre('findOne', autoPopulate)
  .pre('findById', autoPopulate)

module.exports = mongoose.model('Comment', CommentSchema)
