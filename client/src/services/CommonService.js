import Api from './Api'

export default {
  getHomePage () {
    return Api().get('')
  },
  uploadFile (data) {
    return Api().post('/upload', data)
  }
}
