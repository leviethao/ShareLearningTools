import Api from './Api'

export default {
  getMyUserInfo () {
    return Api().get('user')
  },
  getUserInfo (userId) {
    return Api().get(`user/${userId}`)
  },
  updateUserInfo (user) {
    return Api().post('user/update', user)
  },
  async getMyNotifies () {
    return await Api().get('mynotifies')
  }
}
