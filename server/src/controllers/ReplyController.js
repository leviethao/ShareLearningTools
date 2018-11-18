const Reply = require('../models/reply')
const Comment = require('../models/comment')
const Notify = require('../models/notify')

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
            .exec(async function (err, _rep) {
              if (err) throw err

              // Replyer === Commenter => not notify
              if (comment.commenter._id.toString() === _rep.replyer._id.toString()) {
                res.send({reply: _rep})
                return
              }

              let cmt = await Comment.findById(comment._id).populate('post').exec()
              if (!cmt) {
                res.send({reply: _rep})
                return
              }

              // create notifycation
              let notify = new Notify({
                created: Date.now(),
                content: _rep.replyer.name + ' Đã trả lời bình luận của bạn',
                user: cmt.commenter._id,
                link: cmt.post.url,
                status: 'On'
              })

              notify.save(async (err, newNotify) => {
                if (err) throw err

                // add notify to commenter
                cmt.commenter.notifies.push(newNotify._id)
                await cmt.commenter.save()
              })

              res.send({reply: _rep})
            })
        })
      })
    })
  },
  deleteReply (req, res) {
    Reply.findByIdAndDelete(req.params.id, (err, rep) => {
      if (err) {
        res.send({reply: null})
        throw err
      }
      res.send({reply: rep})
    })
  }
}
