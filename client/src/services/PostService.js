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
  getNotAllowPosts () {
    return Api().get('notAllowPosts')
  },
  getMyPosts () {
    return Api().get('myPosts')
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
  allowPost (id) {
    return Api().put(`post/allow/${id}`)
  },
  disablePost (id) {
    return Api().put(`post/disable/${id}`)
  },
  updatePost (post) {
    return Api().put(`post/update/${post._id}`, post)
  },
  async countEnablePosts () {
    return await Api().get('post/count/enablePosts')
  },
  async countDisablePosts () {
    return await Api().get('post/count/disablePosts')
  },
  async countProvidePosts () {
    return await Api().get('post/count/providePosts')
  },
  async countProvidedPosts () {
    return await Api().get('post/count/providedPosts')
  },
  async countNonProvidedPosts () {
    return await Api().get('post/count/nonProvidedPosts')
  },
  async countReceivePosts () {
    return await Api().get('post/count/receivePosts')
  },
  async countNonReceivedPosts () {
    return await Api().get('post/count/nonReceivedPosts')
  }
}
