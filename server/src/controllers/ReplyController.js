const Reply = require('../models/reply')
const Comment = require('../models/comment')

module.exports = {
  async createReply (req, res) {
    let reply = new Reply({
      content: req.body.content,
      replyer: req.user._id,
      comment: req.body.comment
    })

    await reply.save(async (err, newReply) => {
      if (err) throw err
      // update replies of comment
      await Comment.findById(req.body.comment, (err, comment) => {
        if (err) throw err
        comment.replies.push(newReply._id)
        comment.save((err, commentUpdate) => {
          if (err) throw err

          // response new reply
          Reply.findById(newReply._id)
            .exec(function (err, _rep) {
              if (err) throw err
              res.send({reply: _rep})
            })
        })
      })
    })
  }
}
