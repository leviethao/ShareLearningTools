const Comment = require('../models/comment')

module.exports = {
  async createComment (req, res) {
    let comment = new Comment({
      content: req.body.content,
      commenter: req.user._id,
      post: req.body.post
    })
    console.log(req.body.content)
    console.log(req.body.post)
    await comment.save((err) => {
      if (err) throw err
    })
  }
}
