import Api from './Api'

export default {
  createEvent (data) {
    return Api().post('event/create', data)
  }
}
