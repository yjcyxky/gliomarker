<template>
  <a-row class="query-table">
    <a-col class="action">
      <label>Gene Symbol or Entrez ID</label>
      <a-input
        class="search-box"
        placeholder="Input official gene symbol or Entrez ID to query the efficiency results."
        allowClear
        size="large"
        @change="checkGeneName"
        :defaultValue="gene"
        style="width: 500px; margin-right: 5px;"
      />
      <a-button :disabled="notValidGene" type="primary" size="large" @click="onSearch">
        <a-spin v-show="checking" size="small" style="margin-right: 5px;" />Query
      </a-button>
    </a-col>
    <a-col class="results">
      <a-table
        :columns="columns"
        :data-source="data"
        :loading="loading"
        :pagination="pagination"
        rowKey="key"
      >
        <span slot="number" slot-scope="text">{{ text.slice(0, 7) }}</span>
        <span slot="bool" slot-scope="text">{{ formatBool(text) }}</span>
        <a
          slot="popup"
          slot-scope="text, record"
          :disabled="formatBool(text) == 'No'"
          @click="popup(record)"
        >{{ formatBool(text) }}</a>
      </a-table>
    </a-col>
    <a-modal :title="title" :visible="visible" :footer="null" @cancel="close" class="popup">
      <a-table
        :columns="popupColumns"
        :loading="popupLoading"
        :data-source="popupData"
        :scroll="{x: 520, y: 280}"
        :pagination="false"
      >
        <p slot="html" slot-scope="text" v-html="text"></p>
      </a-table>
    </a-modal>
  </a-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    columns: {
      required: true,
      type: Array
    },
    queryFn: {
      required: true,
      type: Function
    },
    popupFn: {
      required: false,
      type: Function,
      default: () => {}
    },
    popupColumns: {
      required: false,
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      data: [],
      loading: false,
      popupLoading: false,
      popupData: [],
      currentRecord: null,
      visible: false,
      gene: 'WNT1',
      notValidGene: false,
      checking: false,
      pagination: {
        pageSizeOptions: ['10', '20', '30', '50', '100'],
        showSizeChanger: true,
        showTotal: total => `Total ${total} items`,
        showQuickJumper: true,
        pageSize: 10,
        total: 0,
        current: 1,
        onChange: (page, pageSize) => {
          this.pagination.pageSize = pageSize
          this.pagination.current = page
          this.onSearch()
        },
        onShowSizeChange: (current, pageSize) => {
          this.pagination.pageSize = pageSize
          this.pagination.current = 1
          this.onSearch()
        }
      }
    }
  },
  computed: {
    title() {
      if (this.currentRecord) {
        return this.currentRecord.Symbol + ' - ' + this.currentRecord.gRNA_Seq + ' | ' + this.currentRecord.PAM
      } else {
        return ''
      }
    }
  },
  methods: {
    ...mapActions({
      validateGene: 'ValidateGene'
    }),
    formatBool(text) {
      if (text) {
        return 'Yes'
      } else {
        return 'No'
      }
    },
    close() {
      this.visible = false
    },
    checkGeneName(e) {
      // this.notValidGene = true
      // this.checking = true
      this.gene = e.target.value

      // Check
      // this.validateGene(this.gene)
      //   .then(response => {
      //     if (response.data.response.numFound === 0) {
      //       this.notValidGene = true
      //       // this.$message.warning(`Not valid gene symbol - ${this.gene}`)
      //     } else {
      //       this.notValidGene = false
      //     }

      //     this.checking = false
      //     console.log('validateGene: ', response, this.notValidGene)
      //   })
      //   .catch(error => {
      //     this.checking = false
      //     this.notValidGene = true
      //     console.log('validateGene Error: ', error)
      //   })
    },
    popup(record) {
      this.currentRecord = record
      this.visible = true
      this.popupLoading = true
      const id = record.Chr + ':' + record.chrStart + '|' + record.gRNA_Seq + record.PAM

      this.popupFn(id)
        .then(response => {
          this.popupData = response
          this.popupLoading = false
        })
        .catch(error => {
          // this.$message.error('Unknown error, please retry later')
          this.popupData = []
          console.log('Unknown Error: ', error)
          this.popupLoading = false
        })
    },
    whichType(gene) {
      if (gene.match(/^[0-9]+$/)) {
        return 'geneid'
      } else {
        return 'symbol'
      }
    },
    onSearch() {
      // check rules
      console.log('onSearch: ', this.gene)

      const type = this.whichType(this.gene)
      this.loading = true
      this.queryFn(type, this.gene.toUpperCase(), this.pagination.current, this.pagination.pageSize)
        .then(response => {
          console.log('queryFn: ', response)
          if (response.results) {
            this.data = response.results
            this.pagination.total = response.count
          } else {
            this.data = response
          }
          this.loading = false
        })
        .catch(error => {
          // this.$message.error('Unknown error, please retry later')
          console.log('Unknown Error: ', error)
          this.loading = false
          this.data = []
        })
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

.popup {
  width: 100%;

  .ant-modal {
    width: 55% !important;
  }

  .ant-modal-body {
    padding: 0px 20px 10px;

    p {
      margin-bottom: 0px;
    }

    .ant-table-thead > tr > th,
    .ant-table-tbody > tr > td {
      padding: 16px 5px;
    }

    .ant-table-tbody {
      .ant-table-row {
        background-color: #fafafa;
      }
    }

    .ant-table-thead > tr > th {
      background-color: #fff;
    }
  }
}
</style>
