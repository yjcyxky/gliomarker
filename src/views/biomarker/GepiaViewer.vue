<template>
  <a-row class="gepia-container" :gutter="16">
    <a-col class="left" span="12">
      <a-form layout="inline" :form="boxplotForm" @submit="createBoxplot">
        <a-form-item label="Differential Methods">
          <a-radio-group v-decorator="['methodoption', { initialValue: boxplotValues.methodoption }]">
            <a-radio-button value="LIMMA">LIMMA</a-radio-button>
            <a-radio-button value="ANNOVA">ANNOVA</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="|Log2FC| Cutoff:">
          <a-input-number v-decorator="['fccutoff', { initialValue: boxplotValues.fccutoff }]" />
        </a-form-item>
        <br/>
        <a-form-item label="q-value Cutoff:">
          <a-input-number v-decorator="['qcutoff', { initialValue: boxplotValues.qcutoff }]" />
        </a-form-item>
        <a-form-item label="Log Scale">
          <a-select v-decorator="['iflog', { initialValue: boxplotValues.iflog }]">
            <a-select-option value="yes">YES</a-select-option>
            <a-select-option value="no">NO</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" htmlType="submit">Submit</a-button>
        </a-form-item>
      </a-form>
      <a-spin v-if="boxplotLoading" class="spin-container" />
      <a-empty v-else-if="boxplotNoData" class="empty-container" />
      <iframe v-else class="pdf-container" style="border: none;" :src="boxplotUrl" />
    </a-col>
    <a-col class="right" span="12">
      <a-form layout="inline" :form="survivalForm" @submit="createSurvivalPlot">
        <a-form-item label="Methods">
          <a-radio-group v-decorator="['methodoption', { initialValue: survivalValues.methodoption }]">
            <a-radio-button value="os">Overall Survival</a-radio-button>
            <a-radio-button value="dfs">Disease Free Survival (DFS)</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="Hazards Ratio (HR)">
          <a-select v-decorator="['ifhr', { initialValue: survivalValues.ifhr }]">
            <a-select-option value="hr">Yes</a-select-option>
            <a-select-option value="no">No</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Axis Units">
          <a-select v-decorator="['axisunit', { initialValue: survivalValues.axisunit }]">
            <a-select-option value="month">Month</a-select-option>
            <a-select-option value="day">Day</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" htmlType="submit">Submit</a-button>
        </a-form-item>
      </a-form>
      <a-spin v-if="survivalLoading" class="spin-container" />
      <a-empty v-else-if="survivalNoData" class="empty-container" />
      <iframe v-else class="pdf-container" style="border: none;" :src="survivalUrl"/>
    </a-col>
  </a-row>
</template>

<script>
import { axios } from '@/utils/request'
// import axios from 'axios'

const GEPIA_API = 'https://prophet-gepia.3steps.cn'

export default {
  name: 'Gepia',
  props: {
    gene: {
      type: String,
      default: 'ERBB2',
      required: false
    }
  },
  data() {
    return {
      boxplotForm: this.$form.createForm(this),
      survivalForm: this.$form.createForm(this),
      boxplotLoading: true,
      boxplotNoData: false,
      survivalLoading: true,
      survivalNoData: false,
      boxplotUrl: '',
      survivalUrl: '',
      survivalValues: {
        methodoption: 'os',
        axisunit: 'month',
        ifhr: 'hr'
      },
      boxplotValues: {
        methodoption: 'LIMMA',
        iflog: 'yes',
        fccutoff: 1,
        qcutoff: 1
      }
    }
  },
  watch: {
    gene() {
      this.createBoxplot()
      this.createSurvivalPlot()
    }
  },
  methods: {
    createBoxplot() {
      this.boxplotForm.validateFields((err, values) => {
        if (!err) {
          console.log('Create Boxplot: ', values)
          this.boxplotLoading = true
          this.boxplotNoData = false

          if (!values.methodoption) {
            values = this.boxplotValues
          }

          axios.get(`${GEPIA_API}/boxplot?gene=${this.gene}&methodoption=${values.methodoption}&fccutoff=${values.fccutoff}&qcutoff=${values.qcutoff}&iflog=${values.iflog}`)
          .then(response => {
            if (response === 'No such gene.') {
              this.boxplotLoading = false
              this.boxplotNoData = true
            } else {
              this.boxplotNoData = false
              this.boxplotLoading = false
              this.boxplotUrl = response
            }
          })
        }
      })
    },
    createSurvivalPlot() {
      this.survivalForm.validateFields((err, values) => {
        if (!err) {
          console.log('Create Survival: ', values)
          this.survivalLoading = true
          this.survivalNoData = false

          if (!values.methodoption) {
            values = this.survivalValues
          }

          axios.get(`${GEPIA_API}/survival?gene=${this.gene}&methodoption=${values.methodoption}&ifhr=${values.ifhr}&axisunit=${values.axisunit}`)
          .then(response => {
            if (response === 'No such gene.') {
              this.survivalLoading = false
              this.survivalNoData = true
            } else {
              this.survivalNoData = false
              this.survivalLoading = false
              this.survivalUrl = response
            }
          })
        }
      })
    }
  },
  created() {
    this.createBoxplot()
    this.createSurvivalPlot()
  }
}
</script>

<style lang="less" scoped>
.gepia-container {
  margin-top: 60px;
  display: flex;

  .spin-container,
  .empty-container,
  .pdf-container {
    width: 100%;
    height: calc(100vh - 300px);
  }

  .spin-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

<style lang="less">
.empty-container {
  .ant-empty-image {
    margin-top: 150px;
  }
}
</style>
