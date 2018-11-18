import Api from './Api'

export default {
  createPost (data) {
    return Api().post('post/create', data)
  },
  getPosts () {
    return Api().get('posts')
  },
  getEnablePosts () {
    return Api().get('enablePosts')
  },
  getPostById (id) {
    return Api().get(`post/${id}`)
  },
  deletePost (id) {
    return Api().delete(`post/delete/${id}`)
  },
  enablePost (id) {
    return Api().put(`post/enable/${id}`)
  },
  disablePost (id) {
    return Api().put(`post/disable/${id}`)
  }
}
