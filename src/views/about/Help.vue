<template>
  <a-row class="markdown-container">
    <vue-markdown
      v-if="content.length > 0"
      @rendered="update"
      :source="content"
      class="markdown-viewer"
    ></vue-markdown>
  </a-row>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import axios from 'axios'
import Prism from 'prismjs'

export default {
  components: {
    VueMarkdown
  },
  props: {
    filename: {
      required: false,
      default: 'help.md',
      type: String
    }
  },
  data() {
    return {
      content: ''
    }
  },
  watch: {
    $route(to, from) {
      this.getContent()
    }
  },
  methods: {
    update() {
      this.$nextTick(() => {
        Prism.highlightAll()
      })
    },
    getContent() {
      const host = window.location.host
      const url = 'http://' + host + '/static/' + this.filename
      axios.get(url).then(response => {
        console.log('Markdown: ', response)
        this.content = response.data
      })
    }
  },
  created() {
    this.getContent()
  }
}
</script>

<style lang="less" scoped>
.markdown-container {
  .markdown-viewer {
    border: 1px solid #e8e8e8;
    border-radius: 3px;
    padding: 15px 30px;
    background-color: #fff;
    min-height: 500px;
  }
}
</style>

<style lang="less">
.markdown-viewer {
  h1 {
    font-size: 2em;
    font-weight: 600;
  }

  h2 {
    font-size: 1.5em;
    border-bottom: 1px solid #eaecef;
    font-weight: 600;
  }

  p {
    color: #24292e;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji,
      Segoe UI Emoji, Segoe UI Symbol, '\5FAE\8F6F\96C5\9ED1';
    font-size: 16px;
    line-height: 1.5;
  }

  blockquote {
    padding: 0 1em;
    color: #6a737d;
    border-left: 0.25em solid #dfe2e5;
  }

  ou,
  ul {
    list-style: disc;
    font-size: 16px;
    padding: 0px 20px;
  }

  ul li {
    font-size: 16px;
  }

  pre {
    display: block;
    padding: 9.5px;
    margin: 0 0 10px;
    font-size: 13px;
    line-height: 1.42857143;
    color: #333;
    word-break: break-all;
    word-wrap: break-word;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 4px;

    code {
      padding: 0;
      font-size: inherit;
      color: inherit;
      white-space: pre-wrap;
      background-color: transparent;
      border-radius: 0;
    }
  }
}
</style>
