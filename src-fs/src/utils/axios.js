if (process.env === 'dev') {
  // var baseIp = '//localhost'
  // var baseIp = '//192.168.1.3'
  var baseIp = '//124.222.36.246'
}
if (process.env === 'prod' || process.env === 'simple') {
  var baseIp = window.location.origin
}

const baseUrl = baseIp + '/api/graph'

export { baseIp, baseUrl }

import axios from 'axios'
import Imitation from './imitation'

const axiosINS = axios.create()

var number = 0
const changeLoading = e => {
  if (e) {
    number++
    if (!Imitation.state.xhrLoading) Imitation.assignState({ xhrLoading: true })
  } else {
    number--
    if (!number && Imitation.state.xhrLoading) Imitation.assignState({ xhrLoading: false })
  }
}

axiosINS.defaults.baseURL = baseUrl

axiosINS.interceptors.request.use(config => {
  if (Imitation.state.userInformation.token) config.headers.token = Imitation.state.userInformation.token
  changeLoading(true)
  return Promise.resolve(config)
}, error => {
  return Promise.reject(error)
})

axiosINS.interceptors.response.use(response => {
  changeLoading(false)
  if (!response.data.response) {
    if (response.data.error === 'Error') {
      Imitation.assignState({ message: '系统异常，请稍后再试' })
    }
    if (response.data.message) {
      Imitation.assignState({ message: response.data.message })
    }
    return Promise.reject(response.data)
  }
  return Promise.resolve(response.data)
}, error => {
  changeLoading(false)
  return Promise.reject(error)
})

export default axiosINS