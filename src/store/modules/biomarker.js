/* eslint-disable camelcase */
import BiomarkerService from '@/api/biomarker'
import { validateGene } from '@/api/manage'
import orderBy from 'lodash.orderby'
import map from 'lodash.map'
import uniq from 'lodash.uniq'
import alasql from 'alasql'

const collectGroups = function(key, results) {
  return uniq(map(results, key)).sort()
}

const formatFilters = function(values) {
  return map(values, item => {
    return { text: item, value: item }
  })
}

const filterItems = ['type_of_biomarker', 'level_of_evidence', 'research_region', 'source', 'type_of_rna_biomarker', 'journal', 'publication_time', 'disease_classification']

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
        align: 'center',
        visible: true,
        sorter: (a, b) => a.pmid - b.pmid,
        sortDirections: ['descend', 'ascend'],
        scopedSlots: { customRender: 'pmid' }
      },
      {
        title: 'Journal',
        dataIndex: 'journal',
        key: 'journal',
        width: 130,
        visible: true,
        align: 'center'
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
        title: 'Level',
        dataIndex: 'level_of_evidence',
        key: 'level_of_evidence',
        visible: false,
        align: 'center',
        scopedSlots: { customRender: 'level' }
      },
      {
        title: 'Region',
        dataIndex: 'research_region',
        key: 'research_region',
        visible: true,
        align: 'center'
      },
      {
        title: 'Source',
        dataIndex: 'source',
        key: 'source',
        visible: true,
        align: 'center'
      },
      {
        title: 'Disease Classification',
        dataIndex: 'disease_classification',
        key: 'disease_classification',
        visible: true,
        align: 'center'
      },
      {
        title: 'Disease Type',
        dataIndex: 'disease_type',
        key: 'disease_type',
        visible: false,
        align: 'center'
      },
      {
        title: 'Disease SubType',
        dataIndex: 'disease_subtype',
        key: 'disease_subtype',
        visible: false,
        align: 'center'
      },
      {
        title: 'RNA Type',
        dataIndex: 'type_of_rna_biomarker',
        key: 'type_of_rna_biomarker',
        visible: false,
        align: 'center'
      },
      // {
      //   title: 'Impact Factor',
      //   dataIndex: 'if_2020',
      //   key: 'if_2020',
      //   visible: false,
      //   align: 'center'
      // },
      {
        title: 'Key Experiment',
        dataIndex: 'key_experiment',
        key: 'key_experiment',
        visible: false,
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
        title: 'Specificity',
        dataIndex: 'specificity',
        key: 'specificity',
        visible: false,
        align: 'center'
      },
      {
        title: 'AUC',
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
    totalItems: [],
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
    setTotalItems(state, payload) {
      state.totalItems = payload
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    setTotal(state, payload) {
      state.total = payload
    },
    updateSearchOptions(state, payload) {
      state.searchOptions = Object.assign(state.searchOptions, payload)
    },
    updateColumnFilter(state, { name, filters }) {
      map(state.columns, record => {
        if (record.key === name) {
          record.filters = filters
        }
      })
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
    getGeneData({ commit }, gene) {
      console.log('ValidateGene: ', gene)
      return new Promise((resolve, reject) => {
        validateGene(gene)
          .then(response => {
            resolve(response.data)
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
            // Set Filters
            for (const item of filterItems) {
              commit('updateColumnFilter', { filters: formatFilters(collectGroups(item, response)), name: item })
            }

            // Query
            const { limit, offset, q, filters } = payload
            let query = `SELECT * FROM ? `
            const where = []
            const responseArray = [response]
            if (q) {
              where.push(`gene_symbol LIKE "${q}%"`)
            }

            if (filters && Object.keys(filters).length > 0) {
              for (const filterItem of Object.keys(filters)) {
                if (filters[filterItem] && filters[filterItem].length > 0) {
                  console.log('Add filter item: ', filterItem, filters[filterItem])
                  where.push(`${filterItem} IN @(?)`)
                  responseArray.push(filters[filterItem])
                }
              }
            }

            if (where.length > 0) {
              query = query + 'WHERE ' + where.join(' AND ')
            }

            // console.log('Query: ', payload, query)

            const totalItems = alasql(query, responseArray)
            const total = totalItems.length

            // ORDER BY if_2020 DESC, gene_symbol ASC
            alasql
              .promise(query + ` ORDER BY type_of_biomarker ASC LIMIT ${limit} OFFSET ${offset}`, responseArray)
              .then(res => {
                commit('setBiomarkerList', res)
                commit('setTotal', total)
                commit('setTotalItems', totalItems)
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
