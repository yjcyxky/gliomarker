import { axios } from '@/utils/request'

class ApiService {
  request(method, url, data = {}, config = {}) {
    return axios({
      method,
      url,
      data,
      ...config
    })
  }

  get(url, config = {}) {
    return this.request('GET', url, {}, config)
  }

  post(url, data, config = {}) {
    return this.request('POST', url, data, config)
  }

  put(url, data, config = {}) {
    return this.request('PUT', url, data, config)
  }

  patch(url, data, config = {}) {
    return this.request('PATCH', url, data, config)
  }

  delete(url, config = {}) {
    return this.request('DELETE', url, {}, config)
  }
}

export default new ApiService()
