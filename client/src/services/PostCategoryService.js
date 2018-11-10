import Api from './Api'
export default {
  getPostCategories () {
    return Api().get('postCategories')
  },
  getPostCategory (id) {
    return Api().get(`/postCategory/${id}`)
  }
}
