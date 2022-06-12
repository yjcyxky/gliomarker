import rawAxios from 'axios'
import { filter } from 'lodash'

class BiomarkerService {
  getBiomarkerList() {
    return new Promise((resolve, reject) => {
      rawAxios
        .get('/static/gliomarker.json')
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  getBiomarker(pmid) {
    return new Promise((resolve, reject) => {
      this.getBiomarkerList()
        .then(response => {
          console.log('Get biomarker with pmid: ', pmid)
          const items = filter(response, item => {
            // pmid may be a string or number
            return item.pmid.toString() === pmid.toString()
          })

          console.log('getBiomarker: ', response, items)

          if (items.length === 1) {
            resolve(items[0])
          } else {
            resolve({})
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  fetchKnowledgeById(knowledgeId) {
    return this.request.get(`/knowledges/${knowledgeId}`)
  }
}

export default new BiomarkerService()
