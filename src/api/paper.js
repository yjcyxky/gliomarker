import ApiService from '@/api/service'

class PaperService {
  constructor() {
    this.request = ApiService
  }

  getPaperList({ limit, offset, q = '', isChecked = '', filterName = '' }) {
    return this.request.get(
      `/papers?limit=${limit}&offset=${offset}&pmid=${q}&ordering=-pmid&${filterName}=${isChecked}`
    )
  }

  addPaper(payload) {
    return this.request.post(`/papers`, payload)
  }

  deletePaper(paperId) {
    return this.request.delete(`/papers/${paperId}`)
  }

  updatePaper(paperId, payload) {
    return this.request.patch(`/papers/${paperId}`, payload)
  }

  fetchPaperById(paperId) {
    return this.request.get(`/papers/${paperId}`)
  }
}

export default new PaperService()
