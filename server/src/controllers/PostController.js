const Post = require('../models/post')

module.exports = {
  async createPost (req, res) {
    let post = new Post({
      content: req.body.content,
      exchangeCondition: req.body.exchangeCondition,
      poster: req.user._id,
      postCategory: req.body.postCategory,
      toolCategory: req.body.toolCategory
    })

    await post.save(function (err) {
      if (err) throw err
    })
  },
  async getPosts (req, res) {
    await Post.find({})
      // .populate('poster')
      .populate('postCategory')
      .populate('toolCategory')
      .populate('comments')
      .exec((err, posts) => {
        if (err) throw err
        res.send({posts: posts})
      })
  }
}
