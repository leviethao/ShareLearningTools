import Api from './Api'
export default {
  getPostCategories () {
    return Api().get('postCategories')
  }
}
