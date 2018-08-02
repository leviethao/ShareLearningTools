import Api from './Api'

export default {
  getToolCategories () {
    return Api().get('toolCategories')
  }
}
