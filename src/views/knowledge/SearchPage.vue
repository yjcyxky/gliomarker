<template lang="html">
  <a-row class="search-page">
    <a-row class="search-container">
      <a-col :xs="20" :sm="20" :md="20" :lg="12">
        <a-row class="slogan">
          Bridge the Gap Between Literature and Knowledge
        </a-row>
        <a-input-search
          v-model="queryString"
          placeholder="Search in Title/Journal/Status/Language Field"
          size="large"
          clearable
          enter-button
          @search="onSearch"/>
      </a-col>
    </a-row>
    <a-row class="show-window">
      <a-row class="show-window-header">
        <img
          class="logo"
          :src="require('@/assets/img/knowledge-point.png')"
        />
        <a-row class="news" style="font-size: 14px;">
          <a-row>Today News</a-row>
          <p class="slogan" v-html="news"></p>
        </a-row>
      </a-row>
      <a-spin :spinning="loading">
        <a-row
          class="card-container"
          :gutter="30"
          v-if="knowledges.length > 0"
        >
          <a-col
            v-for="(card, index) in knowledges"
            :key="index"
            :xs="24"
            :sm="12"
            :md="8"
            :lg="8"
          >
            <card
              :card="card"
              @click.native="showKnowledgeDetail(card.paper)"
            ></card>
          </a-col>
        </a-row>
        <a-row class="not-found" v-else>
          <span>No any knowledges.</span>
        </a-row>
      </a-spin>
      <a-pagination
        @showSizeChange="handleSizeChange"
        @change="handleCurrentChange"
        v-model="currentPage"
        :page-size-options="pageSizeOptions"
        :page-size.sync="pageSize"
        :show-total="total => `Total ${total} items`"
        show-quick-jumper
        show-size-changer
        :total="total"
      >
      </a-pagination>
    </a-row>
  </a-row>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import Card from './Card'
import sortedUniqBy from 'lodash.sorteduniqby'

export default {
  name: 'SearchPage',
  props: {},
  data() {
    return {
      currentPage: 1,
      pageSize: 6,
      pageSizeOptions: ['6', '12', '24', '30', '60'],
      queryString: '',
      news: "<a href='http://datains.3steps.cn'>智汇医圈开启知识新模式</a>",
      tableMode: true
    }
  },
  methods: {
    showKnowledgeDetail: function(paperId) {
      console.log('Show Knownledge Detail: ', paperId)
      this.$router.push({
        name: 'knowledge-detail',
        params: {
          paperId: paperId
        }
      })
    },
    onSearch: function() {
      this.updateSearchOptions({
        limit: this.limit,
        offset: this.offset,
        q: this.queryString
      })
      this.getKnowledgeList({})
    },
    handleSizeChange: function() {
      this.updateSearchOptions({
        limit: this.limit,
        offset: this.offset
      })
      this.getKnowledgeList({})
    },
    handleCurrentChange: function() {
      this.updateSearchOptions({
        limit: this.limit,
        offset: this.offset
      })
      this.getKnowledgeList({})
    },
    ...mapActions('knowledge', ['getKnowledgeList']),
    ...mapMutations('knowledge', ['updateSearchOptions'])
  },
  components: {
    Card
  },
  computed: {
    knowledges: function() {
      return sortedUniqBy(this.items, item => {
        return item.paper
      })
    },
    offset: function() {
      return (this.currentPage - 1) * this.pageSize
    },
    limit: function() {
      return this.pageSize
    },
    ...mapState('knowledge', ['items', 'loading', 'total'])
  },
  created() {
    this.onSearch()
  }
}
</script>

<style lang="less" scoped>
.search-page {
  width: 100%;
  min-height: 1000px;

  .search-container {
    margin: -10px -15px;
    background-image: url('../../assets/img/bg001.jpg');
    background-repeat: no-repeat;
    background-attachment: local;
    background-position: center;
    height: 350px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .ant-col {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: -50px;
    }

    .ant-input-group {
      // width: 50%;
      height: 50px;
    }

    .ant-button {
      width: 100%;
    }

    .slogan {
      color: #fff;
      font-weight: bold;
      font-size: 1.6rem;
      margin-bottom: 20px;
    }
  }

  .show-window {
    margin: 20px auto;
    width: 90%;

    .show-window-header {
      display: flex;
      flex-direction: row;
      font-size: 1.5rem;
      padding: 10px 0px;
      height: 60px;
      margin-bottom: 20px;

      .logo {
        height: 100%;
        padding-right: 5px;
      }

      .news {
        display: flex;
        border-left: 1px solid #d7d7d7;
        padding-left: 5px;
        flex-direction: column;
        font-size: 1.1rem;

        .slogan {
          display: flex;
          height: 100%;
          margin: 0px;
          align-items: center;
        }
      }
    }

    .not-found {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      height: 300px;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      font-weight: 500;
    }

    .ant-pagination {
      display: flex;
      width: 100%;
      margin-top: 10px;
      justify-content: flex-end;
    }
  }
}
</style>

<style lang="less">
.search-page > .show-window .ant-input__inner {
  height: 28px;
}
</style>
