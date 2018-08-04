import Api from './Api'

export default {
  async createComment (data) {
    let response = await Api().post('comment/create', data)
    return response
  }
}
