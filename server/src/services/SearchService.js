const SearchApi = require('./SearchApi')

module.exports = {
  addPostToQueue (postId) {
    SearchApi().post('notify/addPostToQueue', {postId: postId})
  }
}
