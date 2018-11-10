const Post = require('../models/post')

module.exports = {
  async createPost (req, res) {
    let post = new Post({
      content: req.body.content,
      exchangeCondition: req.body.exchangeCondition,
      poster: req.user._id,
      postCategory: req.body.postCategory,
      toolCategory: req.body.toolCategory,
      fileNames: req.body.fileNames
    })

    await post.save(function (err, newPost) {
      if (err) throw err
      Post.findById(newPost._id)
        .populate('postCategory')
        .populate('toolCategory')
        .populate('comments')
        .exec((err, _post) => {
          if (err) throw err
          res.send({post: _post})
        })
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

        // sort date in descending
        let postsSorted = posts.sort((a, b) => {
          let dateA = new Date(a.created)
          let dateB = new Date(b.created)
          return dateB - dateA
        })
        res.send({posts: postsSorted})
      })
  },
  getPostById (req, res) {
    Post.findById(req.params.id)
      .populate('postCategory')
      .populate('toolCategory')
      .populate('comments')
      .exec((err, post) => {
        if (err) throw err
        res.send({post: post})
      })
  },
  deletePost (req, res) {
    Post.findByIdAndDelete(req.params.id, (err, post) => {
      if (err) throw err
      res.send({post: post})
    })
  },
  async enablePost (req, res) {
    let post = await Post.findById(req.params.id)
    if (post) {
      post.enable = true
      let updatedPost = await post.save()
      res.send({post: updatedPost})
      return
    }
    res.send({post: null})
  },
  async disablePost (req, res) {
    let post = await Post.findById(req.params.id)
    if (post) {
      post.enable = false
      let updatedPost = await post.save()
      res.send({post: updatedPost})
      return
    }
    res.send({post: null})
  }
}
