import axios from 'axios'
import store from '@/store/store'
import config from '../config'

function SearchApi () {
  return axios.create({
    baseURL: config.searchServiceHost,
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
}

export default {
  async searchPost (strSearch) {
    let response = await SearchApi().get('search/' + strSearch)
    return response
  }
}
