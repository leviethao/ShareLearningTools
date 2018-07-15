// const User = require('../models/user')

module.exports = {
  async getMyUserInfo (req, res) {
    req.user.password = undefined
    res.send({user: req.user})
  }
}
