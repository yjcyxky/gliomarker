<template>
  <div class="biomarker-details">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="Biomarker">
        <a-collapse v-model="activeKey">
          <a-collapse-panel key="general" header="Biomarker Information">
            <a-row v-for="label in generalLabels" :key="label" style="margin-bottom: 10px">
              <a-col :xs="24" :sm="12" :md="6" :lg="4">
                <a-tag color="#108ee9"> {{ formatLabel(label) }} </a-tag>
              </a-col>
              <a-col :xs="24" :sm="12" :md="12" :lg="12">
                <span>{{ biomarker[label] }}</span>
              </a-col>
            </a-row>
          </a-collapse-panel>
          <a-collapse-panel key="clinical" header="Clinical Information">
            <a-row v-for="label in clinicalLabels" :key="label" style="margin-bottom: 10px">
              <a-col :xs="24" :sm="12" :md="6" :lg="4">
                <a-tag color="#108ee9"> {{ formatLabel(label) }} </a-tag>
              </a-col>
              <a-col :xs="24" :sm="12" :md="12" :lg="12">
                <span>{{ biomarker[label] }}</span>
              </a-col>
            </a-row>
          </a-collapse-panel>
          <a-collapse-panel key="experimental" header="Experimental Information">
            <a-row v-for="label in experimentalLabels" :key="label" style="margin-bottom: 10px">
              <a-col :xs="24" :sm="12" :md="6" :lg="4">
                <a-tag color="#108ee9"> {{ formatLabel(label) }} </a-tag>
              </a-col>
              <a-col :xs="24" :sm="12" :md="12" :lg="12">
                <span>{{ biomarker[label] }}</span>
              </a-col>
            </a-row>
          </a-collapse-panel>
          <a-collapse-panel key="disease" header="Disease Information">
            <a-row v-for="label in diseaseLabels" :key="label" style="margin-bottom: 10px">
              <a-col :xs="24" :sm="12" :md="6" :lg="4">
                <a-tag color="#108ee9"> {{ formatLabel(label) }} </a-tag>
              </a-col>
              <a-col :xs="24" :sm="12" :md="12" :lg="12">
                <span>{{ biomarker[label] }}</span>
              </a-col>
            </a-row>
          </a-collapse-panel>
        </a-collapse>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Ontology"> Comming soon... </a-tab-pane>
      <a-tab-pane key="3" tab="Knowledge Point">
        <knowledge-detail :paperId="biomarker.pmid" v-if="biomarker.pmid"></knowledge-detail>
        <a-empty v-else />
      </a-tab-pane>
      <a-tab-pane key="4" tab="Data Portal">
        <full-frame :src="generateDataPortalURL('glioma_msk_2018', formatGeneSymbol(biomarker.gene_symbol))" :onloadfn="onload"></full-frame>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import KnowledgeDetail from '../knowledge/KnowledgeDetail'
import v from 'voca'
import FullFrame from './FullFrame'
import { generateDataPortalURL, formatGeneSymbol } from './utils'

export default {
  components: {
    KnowledgeDetail,
    FullFrame
  },
  props: {
    biomarkerId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      biomarker: {},
      activeKey: ['general', 'clinical', 'experimental', 'disease'],
      generalLabels: [
        'biomarker',
        'gene_symbol',
        'type_of_biomarker',
        'type_of_rna_biomarker',
        'clinical_use',
        'level_of_evidence'
      ],
      clinicalLabels: ['research_region', 'total_number', 'male', 'female', 'mean_age', 'age', 'stage'],
      experimentalLabels: ['source', 'key_experiment'],
      diseaseLabels: ['disease_type', 'disease_subtype'],
      onload: function(id) {
        console.log('DataPortal: ', id)
        document.getElementById(id).contentWindow.postMessage({ hideHeader: true }, 'http://data.3steps.cn')
      }
    }
  },
  methods: {
    generateDataPortalURL,
    formatGeneSymbol,
    ...mapActions('biomarker', ['getBiomarker']),
    formatLabel(label) {
      return v.titleCase(label.replaceAll('_', ' '))
    }
  },
  created() {
    this.getBiomarker(this.biomarkerId)
      .then(response => {
        this.biomarker = response
        console.log('BiomarkerDetails: ', this.biomarkerId, this.biomarker)
      })
      .catch(error => {
        console.log('Get Biomarker (Error): ', error)
        this.biomarker = {}
      })
  }
}
</script>

<style lang="less" scoped>
.biomarker-details {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  min-height: 620px;

  .ant-tabs-content {
    overflow: scroll;
  }

  .ant-empty {
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}
</style>
