import Api from './Api'

export default {
  async createComment (data) {
    let response = await Api().post('comment/create', data)
    return response
  },
  async deleteComment (id) {
    return await Api().delete(`comment/delete/${id}`)
  },
  async getCommentById (id) {
    return await Api().get(`comment/${id}`)
  },
  async updateComment (id, content) {
    return await Api().put(`comment/update/${id}`, {content: content})
  }
}
