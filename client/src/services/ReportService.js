import Api from './Api'

export default {
  async createReport (postId, content) {
    return await Api().post('report/create', {postId, content})
  },
  async updateReport (id, content) {
    return await Api().put(`report/update/${id}`, {content})
  }
}
