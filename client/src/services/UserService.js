import Api from './Api'

export default {
  getMyUserInfo () {
    return Api().get('user')
  }
}
