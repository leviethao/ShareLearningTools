const Api = require('./Api')

module.exports = {
  sendPostNotify (postId, searchsMatch) {
    Api().post('search/notify', {postId, searchsMatch})
  }
}
