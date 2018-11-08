import Api from './Api'
export default {
  async updateNotifyStatus (id, status) {
    return await Api().post(`notify/updatestatus/${id}`, {status: status})
  }
}
