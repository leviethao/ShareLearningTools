const Report = require('../models/report')
const Post = require('../models/post')

module.exports = {
  async createReport (req, res) {
    let report = new Report({
      content: req.body.content,
      reporter: req.user._id,
      post: req.body.postId
    })

    let newReport = await report.save()
    if (!newReport) {
      res.send({report: null})
      return
    }

    // insert into post reports
    let post = await Post.findById(req.body.postId)
    if (!post) {
      res.send({report: null})
      return
    }
    post.reports.push(newReport._id)
    let updatedPost = await post.save()
    if (!updatedPost) {
      res.send({report: null})
      return
    }
    res.send({report: newReport})
  },

  async updateReport (req, res) {
    let report = await Report.findById(req.params.id)
    report.content = req.body.content
    report.reporter = req.user._id
    let updatedReport = await report.save()
    if (!updatedReport) {
      res.send({report: null})
      return
    }
    res.send({report: updatedReport})
  },
  async getAllReports (req, res) {
    let reports = await Report.find()
      .populate('reporter')
      .populate(
        {
          path: 'post',
          populate: [
            {path: 'postCategory'},
            {path: 'toolCategory'},
            {path: 'comments'},
            {path: 'reports'}
          ]
        }
      )
      .exec()
    if (!reports) {
      res.send({reports: null})
      return
    }
    res.send({reports: reports})
  }
}
