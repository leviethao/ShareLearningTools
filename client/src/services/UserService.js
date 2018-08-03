import Api from './Api'

export default {
  getMyUserInfo () {
    return Api().get('user')
  },
  getUserInfo (userId) {
    return Api().get(`user/${userId}`)
  }
}
