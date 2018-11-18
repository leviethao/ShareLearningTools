import Api from './Api'

export default {
  async createReply (data) {
    let response = await Api().post('reply/create', data)
    return response
  },
  async deleteReply (id) {
    return await Api().delete(`reply/delete/${id}`)
  }
}
