const Notify = require('../models/notify')

module.exports = {
  async updateNotifyStatus (req, res) {
    let notify = await Notify.findById(req.params.id)
    notify.status = req.body.status
    let updatedNotify = await notify.save()
    res.send({notify: updatedNotify})
  }
}
