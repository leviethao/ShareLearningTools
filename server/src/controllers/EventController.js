const Event = require('../models/event')

module.exports = {
  async createEvent (req, res) {
    let event = new Event({
      admin: req.user._id,
      content: req.body.content,
      users: []
    })

    let newEvent = await event.save()
    if (!newEvent) {
      res.send({event: null})
      return
    }

    let newEventDetail = await Event.findById(newEvent._id)
      .populate('admin')
      .exec()

    if (!newEventDetail) {
      res.send({event: null})
      return
    }
    res.send({event: newEventDetail})
  }
}
