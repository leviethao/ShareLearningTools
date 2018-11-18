const Comment = require('../models/comment')
const Post = require('../models/post')
const Notify = require('../models/notify')
const User = require('../models/user')
// const async = require('async')

module.exports = {
  // createComment (req, res) {
  //   async.waterfall([
  //     (done) => {
  //       let comment = new Comment({
  //         content: req.body.content,
  //         commenter: req.user._id,
  //         post: req.body.post
  //       })
  //       done(null, comment)
  //     },

  //     // save comment
  //     (comment, done) => {
  //       comment.save((err, newComment) => {
  //         if (err) return done(err, null)
  //         done(null, newComment)
  //       })
  //     },

  //     // update comments of post
  //     (newComment, done) => {
  //       Post.findById(req.body.post, (err, post) => {
  //         if (err) return done(err, null)
  //         post.comments.push(newComment._id)
  //         post.save((err, postUpdate) => {
  //           if (err) return done(err, null)
  //           done(newComment, null)
  //         })
  //       })
  //     },

  //     // response new comment
  //     (newComment, done) => {
  //       Comment.findById(newComment._id)
  //         .exec(function (err, _cmt) {
  //           if (err) return done(err, null)
  //           done(null, _cmt)
  //         })
  //     }

  //   ], (err, _cmt) => {
  //     if (err) throw err
  //     res.send({comment: _cmt})
  //   })
  // }

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

          //
          Comment.findById(newComment._id)
            .exec(function (err, _cmt) {
              if (err) throw err

              // Commenter === Poster => not notify
              if (_cmt.commenter._id.toString() === post.poster.toString()) {
                res.send({comment: _cmt})
                return
              }

              // create notifycation
              let notify = new Notify({
                created: Date.now(),
                content: _cmt.commenter.name + ' Đã bình luận về bài đăng của bạn',
                user: post.poster,
                link: post.url,
                status: 'On'
              })

              notify.save((err, newNotify) => {
                if (err) throw err

                // add notify to poster
                User.findById(post.poster)
                  .exec((err, user) => {
                    if (err) throw err
                    user.notifies.push(newNotify._id)
                    user.save((err, userUpdate) => {
                      if (err) throw err
                    })
                  })
              })

              // response new comment
              res.send({comment: _cmt})
            })
        })
      })
    })
  },
  deleteComment (req, res) {
    Comment.findByIdAndDelete(req.params.id, (err, cmt) => {
      if (err) {
        res.send({comment: null})
        throw err
      }
      res.send({comment: cmt})
    })
  },
  getCommentById (req, res) {
    Comment.findById(req.params.id)
      .exec((err, cmt) => {
        if (err) {
          res.send({comment: null})
          throw err
        }
        res.send({comment: cmt})
      })
  }

}
