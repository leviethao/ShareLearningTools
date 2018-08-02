const PostCategory = require('../models/post_category')

module.exports = {
  async getAll (req, res) {
    await PostCategory.find({}, function (err, postCategories) {
      if (err) throw err
      res.send({postCategories: postCategories})
    })
  }
}
