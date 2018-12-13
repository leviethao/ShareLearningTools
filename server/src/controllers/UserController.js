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
        if (err) {
          res.send({user: null})
          throw err
        }
        user.name = req.body.name
        user.dateOfBirth = req.body.dateOfBirth
        user.address = req.body.address
        user.phoneNumber = req.body.phoneNumber
        user.gender = req.body.gender
        user.avatar = req.body.avatar
        user.save(function (err, updateUser) {
          if (err) {
            res.send({user: null})
            throw err
          }
          res.send({user: updateUser})
        })
      })
  },
  async getMyNotifies (req, res) {
    await User.findById(req.user._id)
      .populate('notifies')
      .exec((err, user) => {
        if (err) throw err

        // sort date in descending
        let notifies = user.notifies.sort((a, b) => {
          let dateA = new Date(a.created)
          let dateB = new Date(b.created)
          return dateB - dateA
        })
        res.send({notifies: notifies})
      })
  },
  async count (req, res) {
    let count = await User.count()
    res.send({count: count})
  },
  async changePassword (req, res) {
    let user = await User.findById(req.user._id).exec()
    if (!user) {
      res.send({user: null})
      return
    }

    // check password
    let {oldPW, newPW} = req.body
    if (user.password !== oldPW) {
      res.send({user: null})
      return
    }

    user.password = newPW
    let updatedUser = await user.save()
    if (!updatedUser) {
      res.send({user: null})
      return
    }

    res.send({user: updatedUser})
  }
}
