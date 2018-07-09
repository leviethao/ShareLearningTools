import Api from './Api'

export default {
  getHomePage () {
    return Api().get('')
  }
}
