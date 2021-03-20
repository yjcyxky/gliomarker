import BiomarkerService from '@/api/biomarker'
import validateGene from '@/api/manage'
import orderBy from 'lodash.orderby'
import map from 'lodash.map'
import alasql from 'alasql'

const biomarker = {
  namespaced: true,
  state: () => ({
    columns: [
      {
        title: 'Name',
        dataIndex: 'biomarker',
        key: 'biomarker',
        visible: true,
        width: 240,
        align: 'center',
        scopedSlots: { customRender: 'id' }
      },
      {
        title: 'Symbol',
        dataIndex: 'gene_symbol',
        key: 'gene_symbol',
        visible: true,
        width: 150,
        align: 'center',
        scopedSlots: { customRender: 'geneSymbol' }
      },
      {
        title: 'PMID',
        dataIndex: 'pmid',
        key: 'pmid',
        width: 120,
        align: 'center',
        visible: true,
        sorter: (a, b) => a.pmid - b.pmid,
        sortDirections: ['descend', 'ascend'],
        scopedSlots: { customRender: 'pmid' }
      },
      {
        title: 'Publication',
        dataIndex: 'publication_time',
        key: 'publication_time',
        width: 120,
        visible: true,
        align: 'center'
      },
      {
        title: 'Type',
        dataIndex: 'type_of_biomarker',
        key: 'type_of_biomarker',
        visible: true,
        align: 'center'
      },
      {
        title: 'RNA Type',
        dataIndex: 'type_of_rna_biomarker',
        key: 'type_of_rna_biomarker',
        visible: true,
        align: 'center'
      },
      {
        title: 'Level',
        dataIndex: 'level_of_evidence',
        key: 'level_of_evidence',
        visible: true,
        align: 'center',
        scopedSlots: { customRender: 'level' }
      },
      {
        title: 'Source',
        dataIndex: 'source',
        key: 'source',
        visible: true,
        align: 'center'
      },
      {
        title: 'Key Experiment',
        dataIndex: 'key_experiment_in_paper',
        key: 'key_experiment_in_paper',
        visible: false,
        width: 200,
        align: 'center'
      },
      {
        title: 'Up Regulator',
        dataIndex: 'up_regulator',
        key: 'up_regulator',
        visible: false,
        align: 'center'
      },
      {
        title: 'Down Effector',
        dataIndex: 'down_effector_or_targets',
        key: 'down_effector_or_targets',
        visible: false,
        align: 'center'
      },
      {
        title: 'Glioma Type',
        dataIndex: 'glioma_type',
        key: 'glioma_type',
        visible: false,
        align: 'center'
      },
      {
        title: 'Glioma SubType',
        dataIndex: 'glioma_subtype_in_paper',
        key: 'glioma_subtype_in_paper',
        visible: false,
        align: 'center'
      },
      {
        title: 'Research Region',
        dataIndex: 'reserch_region',
        key: 'reserch_region',
        visible: false,
        align: 'center'
      },
      {
        title: 'Total',
        dataIndex: 'total_number',
        key: 'total_number',
        visible: false,
        align: 'center'
      },
      {
        title: 'Male',
        dataIndex: 'male',
        key: 'male',
        visible: false,
        align: 'center'
      },
      {
        title: 'Female',
        dataIndex: 'female',
        key: 'female',
        visible: false,
        align: 'center'
      },
      {
        title: 'Mean Age',
        dataIndex: 'mean_age',
        key: 'mean_age',
        visible: false,
        align: 'center'
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        visible: false,
        align: 'center'
      },
      {
        title: 'Stage',
        dataIndex: 'stage',
        key: 'stage',
        visible: false,
        align: 'center'
      },
      {
        title: 'Sensitivity',
        dataIndex: 'sensitivity',
        key: 'sensitivity',
        visible: false,
        align: 'center'
      },
      {
        title: 'Specitivity',
        dataIndex: 'specitivity',
        key: 'specitivity',
        visible: false,
        align: 'center'
      },
      {
        title: 'ROC',
        dataIndex: 'area_under_the_curve',
        key: 'area_under_the_curve',
        visible: false,
        align: 'center'
      },
      {
        title: 'DOI',
        dataIndex: 'doi',
        key: 'doi',
        visible: false,
        align: 'center'
      }
    ],
    items: [],
    selected: [],
    loading: true,
    current: 0,
    total: 0,
    searchOptions: {
      limit: 10,
      offset: 0,
      q: ''
    }
  }),
  getters: {
    currentBiomarker(state) {
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
    setBiomarkerList(state, payload) {
      state.items = orderBy(payload, 'gene_symbol', 'asc')
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
    updateColumn(state, { name, value }) {
      map(state.columns, record => {
        if (record.title === name) {
          record.visible = value
        }
      })
    },
    initSearchOptions(state) {
      state.searchOptions = {
        limit: 10,
        offset: 0,
        q: ''
      }
    }
  },
  actions: {
    ValidateGene({ commit }, gene) {
      console.log('ValidateGene: ', gene)
      return new Promise((resolve, reject) => {
        validateGene(gene)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getBiomarker({ commit, state }, biomarkerName) {
      return new Promise((resolve, reject) => {
        BiomarkerService.getBiomarker(biomarkerName)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getBiomarkerList({ commit, state }, payload) {
      commit('setLoading', true)
      payload = Object.assign(payload, state.searchOptions)
      return new Promise((resolve, reject) => {
        BiomarkerService.getBiomarkerList()
          .then(response => {
            const { limit, offset, q } = payload
            let query = `SELECT * FROM ?`
            if (q) {
              query = `SELECT * FROM ? WHERE gene_symbol LIKE "${q}%"`
            }

            const total = alasql(query, [response]).length

            alasql
              .promise(query + ` ORDER BY gene_symbol LIMIT ${limit} OFFSET ${offset}`, [response])
              .then(res => {
                commit('setBiomarkerList', res)
                commit('setTotalItems', total)
                resolve(res)
              })
              .catch(error => {
                reject(error)
              })
          })
          .catch(error => {
            reject(error)
          })
          .finally(() => {
            commit('setLoading', false)
          })
      })
    }
  }
}

export default biomarker
