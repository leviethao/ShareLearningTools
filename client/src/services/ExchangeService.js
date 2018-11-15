import Api from './Api'

export default {
  receive (postId) {
    return Api().post('/exchange/receive', {postId: postId})
  },
  isReceived (postId) {
    return Api().post('/exchange/isReceived', {postId: postId})
  },
  unReceived (postId) {
    return Api().post('/exchange/unReceived', {postId: postId})
  }
}
