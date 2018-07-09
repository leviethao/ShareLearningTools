const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res) {
    try {
      var user = new User({
        loginName: req.body.loginName,
        password: req.body.password,
        name: req.body.name
      })
      await User.findOne({'loginName': user.loginName}, 'loginName', function (err, loginName) {
        if (err) { throw err }
        if (loginName) {
          throw new Error('Tên đăng nhập đã tồn tại')
        }
      })
      // Data from form is valid
      user.save(function (err) {
        if (err) {
          console.log('ERROR: ', err)
          throw new Error('Có lỗi xảy ra trong quá trình tạo tài khoản')
        }

        const userJson = user.toJSON()
        res.send({
          // user: userJson,
          token: jwtSignUser(userJson)
        })
      })
    } catch (err) {
      res.status(400).send({
        error: err.message
      })
    }
  },

  async login (req, res) {
    try {
      const {loginName, password} = req.body
      let user = null
      await User.findOne({loginName: loginName}, function (err, userFound) {
        if (err) { throw err }
        user = userFound
      })

      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      const isPasswordValid = user.password === password
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      const userJson = user.toJSON()
      res.send({
        // user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to log in'
      })
    }
  }
}
