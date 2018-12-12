const AppService = require('../services/AppService')
var queue = []

module.exports = {
  addPostToQueue (req, res) {
    queue.push(req.body.postId)
    res.send('')
    AppService.sendPostNotify('id001', ['111', '222'])
  }
}