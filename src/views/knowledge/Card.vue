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
/* eslint-disable */
@card-header-font-size: 1rem;
@card-title-font-size: 1rem;
@card-content-font-size: 0.9rem;
@card-padding: 20px;
@card-background-color: #b58148;
@journal-card-background-color: #409eff;

.box-card {
  cursor: pointer;
  margin-bottom: 20px;
  transition: all 0.6s;

  &:hover {
    transform: scale(1.05);
  }

  .left {
    display: flex;
    justify-content: flex-start;
  }

  .right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .journal-card-header {
    display: flex;
    flex-direction: column;
    font-weight: bold;
    font-size: @card-header-font-size;
    padding: @card-padding;
    background-color: @journal-card-background-color;
    color: #fff;

    .journal {
      display: flex;
      flex-direction: row;

      a {
        padding: 5px 0px;
        width: 100%;
        color: #fff;
        display: inline-block;
        font-size: @card-header-font-size;
        -webkit-line-clamp: 2;
        overflow: hidden;
        max-height: 34px;
        min-height: 34px;
        height: 34px;
        width: 90%;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .journal-title {
      font-size: @card-title-font-size;
      margin-top: 10px;
      font-weight: 500;
      overflow: hidden;
      display: -webkit-box;
      line-height: 120%;
      /*! autoprefixer: off */
      -webkit-box-orient: vertical; // 参考 https://github.com/postcss/autoprefixer/issues/776
      /* autoprefixer: on */
      -webkit-line-clamp: 2;
      max-height: 40px;
      min-height: 40px;
      height: 40px;
    }
  }

  .card-header {
    display: flex;
    flex-direction: column;
    font-weight: bold;
    height: 80px;
    font-size: @card-header-font-size;
    padding: @card-padding;
    background-color: @card-background-color;
    color: #fff;

    .title {
      font-size: @card-title-font-size;
      font-weight: 500;
      overflow: hidden;
      display: -webkit-box;
      line-height: 120%;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }

  .content {
    margin: @card-padding;
    font-size: @card-content-font-size;
    overflow: hidden;
    display: -webkit-box;
    line-height: 150%;
    min-height: 90px;
    text-align: justify;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;
  }

  .image {
    img {
      width: 100%;
      height: 200px;
    }
  }

  .tag-container {
    margin: @card-padding;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    max-height: 55px;
    overflow: hidden;

    span {
      display: flex;
      align-items: center;
      height: 20px;
      border: 1px solid #8d8d8d;
      padding: 1px 8px;
      border-radius: 20px;
      margin-right: 5px;
      margin-bottom: 5px;
    }
  }

  .detail {
    padding: @card-padding;
    padding-top: 0px;
    display: flex;
    flex-direction: row;
  }
}
</style>

<style lang="less">
.box-card {
  .ant-card-body {
    padding: 0px;
  }
}
</style>
