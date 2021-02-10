import KnowledgeService from '@/api/knowledge'
import orderBy from 'lodash.orderby'

const knowledge = {
  namespaced: true,
  state: () => ({
    items: [],
    selected: [],
    loading: true,
    current: 0,
    total: 0,
    searchOptions: {
      limit: 10,
      offset: 0,
      q: '',
      isChecked: '',
      filterName: ''
    }
  }),
  getters: {
    isKnowledgeSelected(state) {
      return state.selected.length > 0
    },
    approved(state) {
      if (state.items[state.current]) {
        return state.items[state.current].status !== 'Submitted'
      } else {
        return false
      }
    },
    currentKnowledge(state) {
      if (state.items[state.current]) {
        return state.items[state.current]
      } else {
        return {}
      }
    }
  },
  mutations: {
    setCurrent(state, payload) {
      state.current = payload
    },
    setKnowledgeList(state, payload) {
      state.items = orderBy(payload, 'liked_num', 'desc')
    },
    addKnowledge(state, knowledge) {
      state.items.unshift(knowledge)
    },
    deleteKnowledge(state, knowledgeId) {
      state.items = state.items.filter(item => item.id !== knowledgeId)
    },
    updateSelected(state, selected) {
      state.selected = selected
    },
    updateKnowledge(state, knowledge) {
      const item = state.items.find(item => item.id === knowledge.id)
      Object.assign(item, knowledge)
    },
    resetSelected(state) {
      state.selected = []
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    setTotalItems(state, payload) {
      state.total = payload
    },
    updateSearchOptions(state, payload) {
      state.searchOptions = Object.assign(state.searchOptions, payload)
    },
    initSearchOptions(state) {
      state.searchOptions = {
        limit: 10,
        offset: 0,
        q: '',
        isChecked: '',
        filterName: ''
      }
    }
  },
  actions: {
    getKnowledgeList({ commit, state }, payload) {
      console.log('Knowledge Detail: ', payload)
      commit('setLoading', true)
      payload = Object.assign(payload, state.searchOptions)
      return new Promise((resolve, reject) => {
        KnowledgeService.getKnowledgeList(payload)
          .then(response => {
            commit('setKnowledgeList', response.results)
            commit('setTotalItems', response.count)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
          .finally(() => {
            commit('setLoading', false)
          })
      })
    },
    addKnowledge({ commit }, data) {
      return new Promise((resolve, reject) => {
        KnowledgeService.addKnowledge(data)
          .then(response => {
            commit('addKnowledge', response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateKnowledge({ commit }, data) {
      return new Promise((resolve, reject) => {
        KnowledgeService.updateKnowledge(data.id, data)
          .then(response => {
            commit('updateKnowledge', response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    deleteKnowledge({ commit, state }) {
      return new Promise((resolve, reject) => {
        for (const knowledge of state.selected) {
          KnowledgeService.deleteKnowledge(knowledge.id)
            .then(() => {
              commit('deleteKnowledge', knowledge.id)
            })
            .catch(error => {
              reject(error)
            })
        }
        commit('resetSelected')
      })
    },
    approve({ commit, getters }) {
      const knowledgeId = getters.currentKnowledge.id
      var status = getters.currentKnowledge.status
      if (status === 'Submitted') {
        status = 'Checked'
      }
      const data = {
        status: status
      }
      return new Promise((resolve, reject) => {
        KnowledgeService.approveKnowledge(knowledgeId, data)
          .then(response => {
            commit('updateKnowledge', response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default knowledge
