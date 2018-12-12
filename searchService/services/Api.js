const axios = require('axios')
const config = require('../config')

module.exports = () => {
  return axios.create({
    baseURL: config.serverHost,
    headers: {
    }
  })
}
