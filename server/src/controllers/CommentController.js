const Comment = require('../models/comment')
const Post = require('../models/post')

module.exports = {
  async createComment (req, res) {
    let comment = new Comment({
      content: req.body.content,
      commenter: req.user._id,
      post: req.body.post
    })

    await comment.save(async (err, newComment) => {
      if (err) throw err
      // update comments of post
      await Post.findById(req.body.post, (err, post) => {
        if (err) throw err
        post.comments.push(newComment._id)
        post.save((err, postUpdate) => {
          if (err) throw err

          // response new comment
          Comment.findById(newComment._id)
            .exec(function (err, _cmt) {
              if (err) throw err
              res.send({comment: _cmt})
            })
        })
      })
    })
  }
}
