<template>
  <div class="footer">
    <div class="links">
      <a href="#" target="_blank">Ran Lab</a>
      <a href="https://github.com/disease-prophet" target="_blank">
        <a-icon type="github" /> Prophet
      </a>
      <a href="http://pgx.fudan.edu.cn" target="_blank">Shi Lab</a>
    </div>
    <div class="copyright">
      Copyright
      <a-icon type="copyright" />2018-2021
      <span>Ran Lab</span>
    </div>
    <div class="links">
      |&nbsp;
      <span v-for="item in metadata" :key="item.name">
        <a :href="item.repo">{{ item.name + ' ' + item.version }}</a>&nbsp;|&nbsp;
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GlobalFooter',
  data() {
    return {
      metadata: [
        {
          name: 'Prophet',
          version: 'latest',
          repo: 'https://github.com/disease-prophet'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.footer {
  padding: 0 16px;
  margin: 10px 0;
  text-align: center;

  .links {
    a {
      color: rgba(0, 0, 0, 0.45);

      &:hover {
        color: rgba(0, 0, 0, 0.65);
      }

      &:not(:last-child) {
        margin-right: 20px;
      }
    }
  }

  .copyright {
    margin: 5px 0px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
}
</style>
