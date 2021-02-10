import rawAxios from 'axios'

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

  fetchBiomarkerById(knowledgeId) {
    return this.request.get(`/knowledges/${knowledgeId}`)
  }
}

export default new BiomarkerService()
