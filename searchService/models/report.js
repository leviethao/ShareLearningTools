var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ReportSchema = new Schema({
  created: {type: Date, default: Date.now},
  content: {type: String, required: true, min: 1, max: 10000},
  reporter: {type: Schema.ObjectId, ref: 'User', required: true},
  post: {type: Schema.ObjectId, ref: 'Post', required: true}
})

module.exports = mongoose.model('Report', ReportSchema)
