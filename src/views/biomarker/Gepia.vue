<template>
  <a-row class="gepia-container">
    <a-col class="left">
      <a-form layout="vertical" :form="form">
        <a-form-item label="Differential Methods">
          <a-radio-group v-decorator="['methodoption']">
            <a-radio-button value="LIMMA">LIMMA</a-radio-button>
            <a-radio-button value="ANNOVA">ANNOVA</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="|Log2FC| Cutoff:">
          <a-input-number v-decorator="['fccutoff', { initialValue: 1 }]" />
        </a-form-item>
        <a-form-item label="q-value Cutoff:">
          <a-input-number v-decorator="['qcutoff', { initialValue: 1 }]" />
        </a-form-item>
        <a-form-item label="Log Scale">
          <a-select v-decorator="['iflog', { rules: [] }]">
            <a-select-option value="yes">YES</a-select-option>
            <a-select-option value="no">NO</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-col>
    <a-col class="right">
      <a-empty v-if="nodata" />
      <a-spin v-else-if="loading" />
      <img :src="currentImg" v-else />
    </a-col>
  </a-row>
</template>

<script>
import axios from 'axios'

export default {
  name: 'gepia',
  props: {
    defaultUrl: {
      type: String,
      default:
        'http://gepia2.cancer-pku.cn/assets/PHP2/profile.php?signature=ERBB2&iflog=no&matchdata=NG&methodoption=LIMMA&width=&dataset=GBM%0ALGG&fccutoff=&qcutoff=',
      required: false
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      currentImg: '',
      loading: false,
      nodata: false
    }
  },
  methods: {
    loadImg() {
      const url = this.defaultUrl
      this.loading = true
      axios.get(url).then((response) => {
        const pattern = new RegExp('_profile_*')
        if (pattern.test(response.outdir)) {
          this.loading = false
          this.nodata = true
        } else {
          this.loading = false
          this.nodata = false
          this.imageUrl = 'http://gepia2.cancer-pku.cn/tmp/' + response.outdir
        }
      })
    }
  },
  created() {
    this.loadImg()
  }
}
</script>

<style lang="less" scoped>

</style>
