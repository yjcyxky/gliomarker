export function genPayloadByAllStudies(geneList) {
  const payload = {
    RPPA_SCORE_THRESHOLD: 2.0,
    Z_SCORE_THRESHOLD: 2.0,
    cancer_study_list: 'lgggbm_tcga_pub,lgg_tcga_pan_can_atlas_2018,lgg_tcga,gbm_tcga_pub2013,gbm_tcga_pub,gbm_tcga_pan_can_atlas_2018,gbm_tcga,glioma_msk_2018,lgg_ucsf_2014,mbl_broad_2012,mbl_icgc,mbl_pcgp,mbl_sickkids_2016,odg_msk_2017,pcpg_tcga,past_dkfz_heidelberg_2013',
    case_set_id: 'all',
    data_priority: 0,
    gene_list: geneList,
    geneset_list: '',
    tab_index: 'tab_visualize',
    show_samples: false,
    clinicallist: 'CANCER_STUDY,NUM_SAMPLES_PER_PATIENT,PROFILED_IN_COPY_NUMBER_ALTERATION,PROFILED_IN_MUTATION_EXTENDED'
  }

  return payload
}

export function genPayload(cancerStudy, geneList) {
  const payload = {
    cancer_study_list: cancerStudy,
    case_set_id: cancerStudy + '_cnaseq',
    data_priority: 0,
    gene_list: geneList.join('%20'),
    geneset_list: '',
    genetic_profile_ids_PROFILE_COPY_NUMBER_ALTERATION: cancerStudy + '_cna',
    genetic_profile_ids_PROFILE_MUTATION_EXTENDED: cancerStudy + '_mutations',
    tab_index: 'tab_visualize',
    show_samples: false,
    clinicallist: 'NUM_SAMPLES_PER_PATIENT'
  }

  return payload
}

export function generateDataPortalURL(cancerStudy, geneList) {
  const url = 'http://data.3steps.cn/cdataportal/results/oncoprint?Action=Submit&'
  const payload = genPayloadByAllStudies(geneList)
  // const payload = genPayload(cancerStudy, geneList)

  const params = new URLSearchParams()
  for (const key in payload) {
    if (payload.hasOwnProperty(key)) {
      params.set(key, payload[key])
    }
  }

  console.log('generateDataPortalURL: ', url + params.toString())
  return url + params.toString()
}

export function formatGeneSymbol(geneSymbol) {
  return geneSymbol.split(';')
}