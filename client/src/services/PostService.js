import Api from './Api'

export default {
  createPost (data) {
    return Api().post('post/create', data)
  }
}
