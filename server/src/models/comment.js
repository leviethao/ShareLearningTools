var mongoose = require('mongoose')
var Schema = mongoose.Schema
var CommentSchema = new Schema({
  created: {type: Date, default: Date.now()},
  content: {type: String, required: true, min: 1, max: 10000},
  commenter: {type: Schema.ObjectId, ref: 'User', required: true},
  post: {type: Schema.ObjectId, ref: 'Post', required: true}
})

var autoPopulateCommenter = function (next) {
  this.populate('commenter')
  next()
}

CommentSchema
  .pre('find', autoPopulateCommenter)
  .pre('findOne', autoPopulateCommenter)

module.exports = mongoose.model('Comment', CommentSchema)
