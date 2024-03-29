<template>
  <a-row class="query-table">
    <a-col class="action">
      <label>Gene Symbol</label>
      <a-input
        class="search-box"
        placeholder="Input official gene symbol to query the biomarker information."
        allowClear
        size="large"
        @change="checkGeneName"
        :defaultValue="queryString"
        style="width: 500px; margin-right: 5px"
      />
      <a-button :disabled="notValidGene" type="primary" size="large" @click="onSearch">
        <a-spin v-show="checking" size="small" style="margin-right: 5px" />Query
      </a-button>
      <a-button style="margin-left: 5px" size="large" @click="downloadAsJSON">Download As JSON</a-button>
      <a-button style="margin-left: 5px" size="large" @click="downloadAsCSV">Download As CSV</a-button>
    </a-col>
    <a-col class="results">
      <a-popover v-model="menuVisible" trigger="click" placement="rightBottom">
        <a-row slot="content">
          <a-col class="column-list">
            <a-checkbox
              v-for="item in columns"
              :defaultChecked="item.visible"
              :checked="item.visible"
              :key="item.key"
              @change="onSelectColumn(item.title, $event)"
            >
              {{ item.title }}
            </a-checkbox>
          </a-col>
        </a-row>
        <a-button type="primary" size="small" style="position: absolute; z-index: 8; top: 15px; left: 10px" icon="plus">
        </a-button>
      </a-popover>
      <a-table
        :scroll="{ x: width }"
        :columns="filteredColumns"
        :data-source="biomarkers"
        :pagination="false"
        :loading="loading"
        @change="handleTableChange"
        rowKey="pmid"
      >
        <router-link
          slot="geneSymbol"
          slot-scope="text"
          :to="{ name: 'embeded-frame', query: { src: generateUrl(text) } }"
        >
          {{ text }}
        </router-link>
        <router-link
          slot="id"
          slot-scope="text, record"
          :to="{ name: 'biomarker-details', params: { biomarkerId: record.pmid } }"
        >
          {{ text }}
        </router-link>
        <router-link slot="pmid" slot-scope="text" :to="{ name: 'knowledge-detail', params: { paperId: text } }">
          {{ text }}
        </router-link>
        <span slot="number" slot-scope="text">{{ text.slice(0, 3) }}</span>
        <a-tooltip slot="level" slot-scope="text">
          <template slot="title">
            <span>{{ text.split(', ')[1].replaceAll(/"/ig, "") }}</span>
          </template>
          <span>{{ titleCase(text.split(', ')[0]) }}</span>
        </a-tooltip>
        <a-row slot="expandedRowRender" slot-scope="record" style="margin: 0">
          <a-row
            v-for="item in specialColumns"
            :key="item.key"
            style="display: flex; flex-direction: row; margin-bottom: 5px"
          >
            <a-col style="width: 180px">
              <a-tag color="#108ee9">{{ item.title }}</a-tag>
            </a-col>
            <a-col style="width: calc(100% - 180px)">{{ record[item.key] }}</a-col>
          </a-row>
        </a-row>
      </a-table>
      <a-pagination
        style="margin-top: 10px; float: right"
        @showSizeChange="handleSizeChange"
        @change="handleCurrentChange"
        v-model="currentPage"
        :page-size-options="pageSizeOptions"
        :page-size.sync="pageSize"
        :show-total="(total) => `Total ${total} items`"
        show-quick-jumper
        show-size-changer
        :total="total"
      >
      </a-pagination>
      <a id="downloadAnchorElem" v-show="false"></a>
    </a-col>
  </a-row>
</template>

<script>
import { titleCase } from 'voca'
import { mapActions, mapMutations, mapState } from 'vuex'
import filter from 'lodash.filter'
import { generateDataPortalURL, formatGeneSymbol } from './utils'

export default {
  props: {},
  data() {
    return {
      titleCase,
      specialColumns: [
        {
          key: 'title',
          title: 'Title'
        },
        {
          key: 'keywords',
          title: 'Keywords'
        },
        {
          key: 'supplementary_statistics',
          title: 'Supplementary Statistics'
        },
        {
          key: 'description',
          title: 'Description'
        }
      ],
      menuVisible: false,
      visible: false,
      queryString: '',
      notValidGene: false,
      checking: false,
      currentPage: 1,
      pageSize: 10,
      pageSizeOptions: ['10', '20', '30', '50', '100']
    }
  },
  computed: {
    filteredColumns: function() {
      return filter(this.columns, item => {
        return item.visible
      })
    },
    numOfColumns: function() {
      return this.filteredColumns.length
    },
    width: function() {
      return this.numOfColumns > 8 ? this.numOfColumns * 150 : -1
    },
    biomarkers: function() {
      return this.items
    },
    offset: function() {
      return (this.currentPage - 1) * this.pageSize
    },
    limit: function() {
      return this.pageSize
    },
    ...mapState('biomarker', ['items', 'loading', 'total', 'columns', 'totalItems'])
  },
  methods: {
    generateDataPortalURL,
    formatGeneSymbol,
    generateUrl(geneSymbol) {
      return this.generateDataPortalURL('glioma_msk_2018', this.formatGeneSymbol(geneSymbol))
    },
    ...mapActions('biomarker', ['getBiomarkerList', 'ValidateGene']),
    ...mapMutations('biomarker', ['updateSearchOptions', 'updateColumn']),
    json2csv(data) {
      var fields = Object.keys(data[0])
      var replacer = function(key, value) {
        return value === null ? '' : value
      }

      var csv = data.map(function(row) {
        return fields
          .map(function(fieldName) {
            return JSON.stringify(row[fieldName], replacer)
          })
          .join(',')
      })

      csv.unshift(fields.join(',')) // add header column
      csv = csv.join('\r\n')
      return csv
    },
    downloadAsJSON() {
      var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.totalItems))
      var dlAnchorElem = document.getElementById('downloadAnchorElem')
      dlAnchorElem.setAttribute('href', dataStr)
      dlAnchorElem.setAttribute('download', 'data.json')
      dlAnchorElem.click()
    },
    downloadAsCSV() {
      const csv = this.json2csv(this.totalItems)
      console.log(this.totalItems, csv)
      var dataStr = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv)
      var dlAnchorElem = document.getElementById('downloadAnchorElem')
      dlAnchorElem.setAttribute('href', dataStr)
      dlAnchorElem.setAttribute('download', 'data.csv')
      dlAnchorElem.click()
    },
    onSelectColumn(name, event) {
      console.log('onSelectColumn: ', name, event)
      const status = event.target.checked
      if (status && this.filteredColumns.length + 1 > 20) {
        this.$message.warning('Maximum number of selectable columns is 20')
        return
      }

      this.updateColumn({
        name: name,
        value: status
      })
    },
    checkGeneName(e) {
      this.queryString = e.target.value

      this.onSearch()
    },
    onSearch() {
      this.updateSearchOptions({
        limit: this.limit,
        offset: this.offset,
        q: this.queryString
      })
      this.getBiomarkerList({})
    },
    handleSizeChange() {
      this.updateSearchOptions({
        limit: this.limit,
        offset: this.offset
      })
      this.getBiomarkerList({})
    },
    handleCurrentChange() {
      this.updateSearchOptions({
        limit: this.limit,
        offset: this.offset
      })
      this.getBiomarkerList({})
    },
    handleTableChange(pagination, filters, sorter) {
      console.log('handleTableChange: ', pagination, filters, sorter)
      this.getBiomarkerList({ filters })
    }
  },
  created() {
    this.onSearch()
  }
}
</script>

<style lang="less" scoped>
.query-table {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border: 1px solid #e8e8e8;
  background-color: #fff;
  min-height: 525px;
  padding: 30px 10px 20px;

  label {
    font-size: 15px;
  }

  .action {
    margin-bottom: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .search-box {
      width: 400px;
      margin-left: 10px;
    }
  }
}
</style>

<style lang="less">
.query-table {
  .ant-input {
    font-size: 14px !important;
  }
}

.column-list {
  display: flex;
  flex-direction: column;

  .ant-checkbox-wrapper + .ant-checkbox-wrapper {
    margin-left: 0px;
  }
}
</style>
