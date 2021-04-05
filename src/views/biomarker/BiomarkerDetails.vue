<template>
  <div class="biomarker-details">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="Biomarker">
        <a-collapse v-model="activeKey">
          <a-collapse-panel v-for="key in activeKey" :key="key" :header="formatLabel(key)">
            <a-row v-for="label in labels[key]" :key="label" style="margin-bottom: 10px">
              <a-col :xs="24" :sm="12" :md="6" :lg="4">
                <a-tag color="#108ee9"><b>{{ formatLabel(label) }}</b></a-tag>
              </a-col>
              <a-col :xs="24" :sm="12" :md="12" :lg="12">
                <span>{{ biomarker[label] }}</span>
              </a-col>
            </a-row>
          </a-collapse-panel>
        </a-collapse>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Ontology">
        <a-collapse accordion :activeKey="formatGeneSymbol(biomarker.gene_symbol)">
          <a-collapse-panel :key="symbol" :header="symbol" v-for="symbol in formatGeneSymbol(biomarker.gene_symbol)">
            <ontology :geneSymbol="symbol"></ontology>
          </a-collapse-panel>
        </a-collapse>
      </a-tab-pane>
      <a-tab-pane key="3" tab="Knowledge Points">
        <knowledge-detail :paperId="biomarker.pmid" v-if="biomarker.pmid"></knowledge-detail>
        <a-empty v-else />
      </a-tab-pane>
      <a-tab-pane key="4" tab="Data Portal">
        <full-frame
          :src="generateDataPortalURL('glioma_msk_2018', formatGeneSymbol(biomarker.gene_symbol))"
          :onloadfn="onload"
        ></full-frame>
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
import Ontology from './Ontology.vue'

export default {
  components: {
    KnowledgeDetail,
    FullFrame,
    Ontology
  },
  props: {
    biomarkerId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      geneSymbols: [],
      geneSymbol: '',
      biomarker: {},
      activeKey: ['general', 'clinical', 'experimental', 'disease', 'statistics', 'knowledge'],
      labels: {
        general: [
          'biomarker',
          'gene_symbol',
          'description',
          'type_of_biomarker',
          'type_of_rna_biomarker',
          'clinical_use',
          'level_of_evidence'
        ],
        clinical: ['research_region', 'total_number', 'male', 'female', 'mean_age', 'age', 'stage'],
        experimental: ['source', 'key_experiment'],
        disease: ['disease', 'disease_type', 'disease_subtype'],
        statistics: ['sensitivity', 'specitivity', 'area_under_the_curve', 'supplementary_statistics'],
        knowledge: ['up_regulator', 'down_effector_or_targets']
      },
      labelDict: {
        type_of_rna_biomarker: 'Type of RNA Biomarker',
        type_of_biomarker: 'Type of Biomarker',
        level_of_evidence: 'Level of Evidence',
        area_under_the_curve: 'ROC',
        down_effector_or_targets: 'Down Effector or Targets'
      },
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
      const formatedLabel = this.labelDict[label]
      if (formatedLabel) {
        return formatedLabel
      } else {
        return v.titleCase(label.replaceAll('_', ' '))
      }
    },
    switchGene(geneSymbol) {
      this.geneSymbol = geneSymbol
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
