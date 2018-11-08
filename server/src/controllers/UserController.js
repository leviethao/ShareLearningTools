const User = require('../models/user')

module.exports = {
  async getMyUserInfo (req, res) {
    req.user.password = undefined
    res.send({user: req.user})
  },
  async getUserInfo (req, res) {
    await User.findOne({_id: req.params.id}, (err, user) => {
      if (err) throw err
      // user.password = undefined
      res.send({user: user})
    })
  },
  async updateUserInfo (req, res) {
    await User.findById(req.user._id)
      .exec(function (err, user) {
        if (err) throw err
        user.name = req.body.name
        user.dateOfBirth = req.body.dateOfBirth
        user.address = req.body.address
        user.phoneNumber = req.body.phoneNumber
        user.gender = req.body.gender
        user.save(function (err, updateUser) {
          if (err) throw err
        })
      })
  }
}
