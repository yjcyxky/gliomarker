<template lang="html">
  <a-card class="box-card">
    <a-row
      :class="{
        'journal-card-header': journalMode,
        'card-header': !journalMode
      }"
    >
      <a-row class="journal" v-if="journalMode">
        <a-col :span="20" class="left">
          <a-tooltip>
            <template slot="title">
              <span>{{ card.journal }}</span>
            </template>
            <a type="text">{{ card.journal }}</a>
          </a-tooltip>
        </a-col>
        <a-col :span="4" class="right">
          <a-tooltip>
            <template slot="title"><span>Impact Factor</span></template>
            {{ card.impactFactor || "Unknown" }}
          </a-tooltip>
        </a-col>
      </a-row>
      <a-row :class="{ 'journal-title': journalMode, title: !journalMode }">
        {{ card.title }}
      </a-row>
    </a-row>
    <a-row class="image" v-if="card.image_src">
      <img :src="card.image_src" />
    </a-row>
    <a-row class="content">
      {{ card.content }}
    </a-row>
    <a-row class="tag-container">
      <span v-for="tag in tags" :key="tag">{{ labelTag(tag) }}</span>
    </a-row>
    <a-row class="detail">
      <a-col :span="12" class="left">{{ card.owner || card.editor }}</a-col>
      <a-col :span="12" class="right">{{ createdDate }}</a-col>
    </a-row>
  </a-card>
</template>

<script>
import sortedUniq from 'lodash.sorteduniq'

export default {
  name: 'Card',
  props: {
    card: {
      type: Object,
      required: true
    },
    journalMode: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  methods: {
    labelTag: function(tag) {
      if (tag.length > 0) {
        return tag
      } else {
        return 'No Tag'
      }
    }
  },
  computed: {
    tags: function() {
      return sortedUniq(this.card.tags.split(';'))
    },
    createdDate: function() {
      // 2019-12-20T05:15:28.400124Z --> 2019-12-20
      return this.card.created_at.slice(0, 10)
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/css/card.less';
</style>

<style lang="less">
.box-card {
  .ant-card-body {
    padding: 0px;
  }
}
</style>
