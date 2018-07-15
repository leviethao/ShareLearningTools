import axios from 'axios'
import store from '@/store/store'
import config from '../config'

export default () => {
  return axios.create({
    baseURL: config.serverHost,
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
}
