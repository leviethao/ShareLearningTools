const Exchange = require('../models/exchange')
const Post = require('../models/post')
const User = require('../models/user')
const Notify = require('../models/notify')

module.exports = {
  async receive (req, res) {
    let post = await Post.findById(req.body.postId)
    if (!post) {
      res.send({exchange: null})
      return
    }

    let user = await User.findById(req.user._id)
    if (!user) {
      res.send({exchange: null})
      return
    }

    let poster = await User.findById(post.poster)
    if (!poster) {
      res.send({exchange: null})
      return
    }

    let exchange = new Exchange({
      provider: poster._id,
      receiver: user._id,
      date: Date.now(),
      post: post._id
    })

    let newExchange = await exchange.save()
    if (!newExchange) {
      res.send({exchange: null})
      return
    }
    exchange = newExchange

    // add to receive list
    user.receives.push(newExchange._id)
    let updatedUser = await user.save()
    if (!updatedUser) {
      res.send({exchange: null})
      return
    }
    user = updatedUser

    // add to provides list
    poster.provides.push(newExchange._id)
    let updatedPoster = await poster.save()
    if (!updatedPoster) {
      res.send({exchange: null})
      return
    }
    poster = updatedPoster

    // add to exchanges of post
    post.exchanges.push(newExchange._id)
    let updatedPost = await post.save()
    if (!updatedPost) {
      res.send({exchange: null})
      return
    }
    post = updatedPost

    // create notifycation for receiver
    let receivedNotify = new Notify({
      created: Date.now(),
      content: 'Bạn đã nhận dụng cụ học tập từ ' + poster.name,
      user: user._id,
      link: post.url,
      status: 'On'
    })

    let newReceivedNotify = await receivedNotify.save()
    if (!newReceivedNotify) {
      res.send({exchange: null})
      return
    }
    receivedNotify = newReceivedNotify

    // add notify to receiver
    user.notifies.push(receivedNotify._id)
    updatedUser = null
    updatedUser = await user.save()
    if (!updatedUser) {
      res.send({exchange: null})
      return
    }

    // create notifycation for provider
    let providedNotify = new Notify({
      created: Date.now(),
      content: 'Bạn đã chia sẻ dụng cụ học tập cho ' + user.name,
      user: poster._id,
      link: post.url,
      status: 'On'
    })

    let newProvidedNotify = await providedNotify.save()
    if (!newProvidedNotify) {
      res.send({exchange: null})
      return
    }
    providedNotify = newProvidedNotify

    // add notify to provider
    poster.notifies.push(providedNotify._id)
    updatedPoster = null
    updatedPoster = await poster.save()
    if (!updatedPoster) {
      res.send({exchange: null})
      return
    }
    res.send({exchange: exchange})
  },
  async isReceived (req, res) {
    let post = await Post.findById(req.body.postId).populate('exchanges').exec()
    if (!post) {
      res.send({isReceived: false})
      return
    }

    for (let exchange of post.exchanges) {
      if (exchange.receiver.toString() === req.user._id.toString()) {
        res.send({isReceived: true})
        return
      }
    }
    res.send({isReceived: false})
  }
}
