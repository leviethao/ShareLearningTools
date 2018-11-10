const PostCategory = require('../models/post_category')

module.exports = {
  async getAll (req, res) {
    await PostCategory.find({}, function (err, postCategories) {
      if (err) throw err
      res.send({postCategories: postCategories})
    })
  },
  getPostCategory (req, res) {
    PostCategory.findById(req.params.id, (err, postCategory) => {
      if (err) throw err
      res.send({postCategory: postCategory})
    })
  }
}
