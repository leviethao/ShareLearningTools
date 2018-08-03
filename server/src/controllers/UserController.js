const User = require('../models/user')

module.exports = {
  async getMyUserInfo (req, res) {
    req.user.password = undefined
    res.send({user: req.user})
  },
  async getUserInfo (req, res) {
    await User.findOne({_id: req.params.id}, (err, user) => {
      if (err) throw err
      res.send({user: user})
    })
  }
}
