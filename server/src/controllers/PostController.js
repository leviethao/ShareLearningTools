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
  }
}
