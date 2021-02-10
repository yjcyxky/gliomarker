<template lang="html">
  <a-spin :spinning="loading">
    <a-row class="knowledge-detail-page">
      <a-row class="title-container" :gutter="10">
        <a-col class="title" :xs="24" :sm="24" :md="24" :lg="20">
          {{ currentPaper.title }}
        </a-col>
        <a-col class="button-group" :xs="24" :sm="24" :md="24" :lg="3">
          <a-tooltip class="item" placement="top">
            <template slot="title">
              <span>Download Paper</span>
            </template>
            <a-button
              icon="download"
              shape="circle"
              style="margin-right: 5px;"
              type="primary"
              @click.native="downloadPaper(currentPaper.doi)"
            ></a-button>
          </a-tooltip>
          <a-tooltip class="item" placement="top">
            <template slot="title"><span>Like the Paper</span></template>
            <a-button
              shape="round"
              icon="like"
              theme="filled"
              v-if="currentKnowledge.liked_num"
              type="danger"
            >
              Like {{ currentKnowledge.liked_num }}
            </a-button>
            <a-button
              shape="round"
              icon="like"
              v-if="!currentKnowledge.liked_num"
            >
              Like
            </a-button>
          </a-tooltip>
        </a-col>
      </a-row>
      <a-row class="details">
        <span>Author: {{ formatName(currentKnowledge.owner) }}</span>
        <span>Editor: {{ formatName(currentKnowledge.editor) }}</span>
        <span>{{ currentKnowledge.date }}</span>
      </a-row>
      <a-row class="show-window">
        <a-col class="content" :xs="24" :sm="24" :md="24" :lg="10">
          <a-row class="header" :gutter="10">
            <a-col :span="12">
              <a-select
                size="large"
                allowClear
                showSearch
                :value="version"
                placeholder="Please Choose Other Version"
                @change="selectKnowledge"
              >
                <a-select-option
                  v-for="(item, index) in knowledgeVersions"
                  :key="item"
                  :value="index"
                >{{ item }}
                </a-select-option>
              </a-select>
            </a-col>
            <a-col :span="12">
              <a-button type="primary" size="large" disabled>Add New Version</a-button>
            </a-col>
          </a-row>
          <a-row class="paper-content">
            <p v-html="Knowledge"></p>
          </a-row>
        </a-col>
        <a-col class="image" :xs="24" :sm="24" :md="24" :lg="13">
          <img
            :src="currentKnowledge.image_src"
            v-if="currentKnowledge.image_src"
          />
          <span>Coming Soon: Key Figures & Tables...</span>
        </a-col>
      </a-row>
      <a-row class="show-window">
        <a-col class="detail" :xs="24" :sm="24" :md="24" :lg="5">
          <a-row class="item">
            <a-row class="title">Journal</a-row>
            <a-row>{{ currentPaper.journal }}</a-row>
          </a-row>
          <a-row class="item">
            <a-row class="title">PMID</a-row>
            <a-row>{{ currentPaper.pmid }}</a-row>
          </a-row>
          <a-row class="item">
            <a-row class="title">Impact Factor</a-row>
            <a-row>{{ impactFactor }}</a-row>
          </a-row>
          <a-row class="item">
            <a-row class="title">Published Date</a-row>
            <a-row>{{ currentPaper.pubdate }}</a-row>
          </a-row>
          <a-row class="item">
            <a-row class="title">Status</a-row>
            <a-row>{{ currentKnowledge.status }}</a-row>
          </a-row>
          <a-row class="item">
            <a-row class="title">Keywords</a-row>
            <a-row class="tag-container">
              <span v-for="keyword in keywords" :key="keyword">
                {{ keyword }}
              </span>
            </a-row>
          </a-row>
        </a-col>
        <a-col class="detail" :xs="24" :sm="24" :md="24" :lg="18">
          <a-row class="title">{{ currentPaper.title }}</a-row>
          <a-row class="author">{{ currentPaper.authors }}</a-row>
          <a-row class="abstract">{{ currentPaper.abstract }}</a-row>
          <a-row class="keyword">
            <b>Keywords: </b>{{ formatName(currentPaper.keywords) }}
          </a-row>
          <a-row class="link">
            <b>PMID: </b>{{ currentPaper.pmid }}
          </a-row>
          <a-row class="link">
            <b>DOI: </b>{{ currentPaper.doi }}
          </a-row>
        </a-col>
        <a-col class="detail" :xs="24" :sm="24" :md="24" :lg="9" style="display: none;">
          <a-row class="title">Recommendation</a-row>
        </a-col>
      </a-row>
      <a-row class="data-visulization" v-if="notShow">
        <a-col class="summary" :xs="24" :sm="24" :md="24" :lg="5"></a-col>
        <a-col :xs="24" :sm="24" :md="24" :lg="18" class="container"> </a-col>
      </a-row>
      <a-row class="recommendation" v-if="notShow">
        <a-col class="summary" :xs="24" :sm="24" :md="24" :lg="5"> </a-col>
        <a-col :xs="24" :sm="24" :md="24" :lg="18" class="container"> </a-col>
      </a-row>
    </a-row>
  </a-spin>
</template>

<script>
import sortedUniq from 'lodash.sorteduniq'
import map from 'lodash.map'
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
  name: 'KnowledgeDetail',
  props: {},
  data() {
    return {
      notShow: false
    }
  },
  methods: {
    formatName(name) {
      if (name && name.length > 0) {
        return name
      } else {
        return 'Unknown'
      }
    },
    downloadPaper(doi) {
      if (doi.length > 0) {
        const source = this.baseUrl + doi
        window.open(source, '_blank')
      } else {
        this.$message.warn("Oops, can't found the full paper.")
      }
    },
    selectKnowledge: function(value) {
      this.setLoading(true)
      this.setCurrent(value)
      setTimeout(() => {
        this.setLoading(false)
      }, 500)
    },
    ...mapActions('paper', ['setCurrentPaper']),
    ...mapActions('knowledge', ['getKnowledgeList']),
    ...mapMutations('knowledge', ['setCurrent', 'setLoading'])
  },
  mounted() {},
  computed: {
    version: function() {
      if (this.knowledgeVersions.length > 0) {
        return this.knowledgeVersions[0]
      } else {
        return undefined
      }
    },
    knowledgeVersions: function() {
      return map(this.items, item => {
        const language = item.language.toLowerCase()
        return item.pmid + ' - ' + item.owner + ' - ' + language
      })
    },
    loading: function() {
      if (this.filteredProject.length === 0) {
        return true
      } else {
        return false
      }
    },
    Knowledge: function() {
      const content = this.currentKnowledge.content
      if (content) {
        return content.replace(/([②③④⑤⑥⑦⑧⑨⑩])/g, '<br/><br/>$1')
      } else {
        return '<p style="display: flex; height: 100%; justify-content: center; align-items: center;"><span>Not found the knowledge.</span></p>'
      }
    },
    impactFactor: function() {
      if (this.currentPaper.impactFactor) {
        return this.currentPaper.impactFactor
      } else {
        return 'Unknown'
      }
    },
    keywords: function() {
      if (this.currentPaper.keywords) {
        return sortedUniq(this.currentPaper.keywords.split(';'))
      } else {
        return ['Unknown']
      }
    },
    ...mapGetters('paper', ['currentPaper']),
    ...mapGetters('knowledge', ['currentKnowledge']),
    ...mapState('knowledge', ['items', 'loading']),
    ...mapState('paper', ['baseUrl'])
  },
  watch: {},
  components: {},
  created() {
    console.log('Knowledge: ', this.$route.params.paperId)
    const paperId = this.$route.params.paperId
    this.setCurrentPaper(paperId)
    this.getKnowledgeList({ paper: paperId })
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/css/knowledge-detail.less';
</style>

<style lang="less">
.knowledge-detail-page {
  .show-window {
    .ant-select {
      width: 100%;
    }
  }
}

.show-window .ant-btn,
.show-window .ant-btn:hover {
  width: 100%;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  color: #fff;
  background-color: #a0cfff;
  border-color: #a0cfff;
}
</style>
