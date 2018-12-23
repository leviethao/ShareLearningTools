var mongoose = require('mongoose')
var Schema = mongoose.Schema
var PostSchema = new Schema({
  created: {type: Date, default: Date.now},
  content: {type: String, min: 1, max: 10000, required: true},
  exchangeCondition: {type: String, default: ''},
  poster: {type: Schema.ObjectId, ref: 'User', required: true},
  postCategory: {type: Schema.ObjectId, ref: 'PostCategory', required: true},
  toolCategory: {type: Schema.ObjectId, ref: 'ToolCategory', required: true},
  followers: [{type: Schema.ObjectId, ref: 'User'}],
  comments: [{type: Schema.ObjectId, ref: 'Comment'}],
  fileNames: [],
  enable: {type: Boolean, default: false},
  allow: {type: Boolean, default: false},
  exchanges: [{type: Schema.Types.ObjectId, ref: 'Exchange'}],
  reports: [{type: Schema.Types.ObjectId, ref: 'Report'}]
})

PostSchema.virtual('url').get(function () {
  return '/post/' + this._id
})

module.exports = mongoose.model('Post', PostSchema)
