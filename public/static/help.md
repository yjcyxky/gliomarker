# Welcome to GlioMarker

## Data
- Excel File in GlioMarker
[gliomarker.xls](http://prophet.3steps.cn/static/gliomarker_v4.xls)

- JSON File in GlioMarker
[gliomarker.json](http://prophet.3steps.cn/static/gliomarker_v4.json)

<a name="kfoU4"></a>
## The constraction of GlioMarker
The flowchart of GlioMarker construction was shown in Figure1, including literature-based mining,  biological function investigations，and high-throughput datasets verification. <br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/358193/1616245035525-329a1b2c-d076-47b3-b14d-74216192ca59.png#align=left&display=inline&height=570&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1140&originWidth=802&size=160218&status=done&style=none&width=401)<br />Figure 1: The flowchart of GlioMarker construction
<a name="BdukC"></a>
## Data Selection Criteria
To guarantee the high quality of data collection, all the data for GlioMarker are collected from the public database PubMed by manually text mining. The detailed literature searching was performed in PubMed (http://www.ncbi.nlm.nih.gov/ pubmed) using the keywords [‘gliomas’, ‘glial cell tumors’, ‘glioblastoma’, ‘astrocytoma’, ‘oligodendrogliomas’, or ‘ependymoma’] and [‘biomarker’ or  ‘indicator’, ‘marker’ or ‘predictor’] and [‘diagnostic’ or ‘diagnosis’]. Figure 2 shows the procedure of data collection.<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/358193/1616245341852-c5a81b6b-48aa-44bc-a619-1568c19adf30.png#align=left&display=inline&height=548&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1096&originWidth=760&size=144592&status=done&style=none&width=380)<br />Figure2: The pipeline of literature curation 
<a name="7JAwX"></a>
## Data startistics
**Table 1. Statiditics of the distribution of biomarkers in GlioMarker**

| **Based on clinical uses** |   | **Based on biomolecules** |   |
| --- | --- | --- | --- |
| Diagnositic, Prognostic | 100 | Protein | 131 |
| Diagnositic | 98 | miRNA | 61 |
| Diagnositic, Therapeutic | 62 | lncRNA | 15 |
| Diagnositic, Prognostic, Therapeutic | 18 | mRNA | 5 |
| Diagnositic, Therapeutic, Predictive | 4 | DNA | 25 |
| Diagnositic, Predictive | 2 | Imageological Biomarkers | 17 |
| Diagnositic, Prognostic, Predictive | 1 | Epigenic Biomarkers | 13 |
|   |   | Immunological Biomarkers | 9 |
|   |   | Metabolic Biomarkers | 9 |
|   |   |   |   |
| **Based on sources of samples** |   | **Based on disease types** |   |
| Tissue | 193 | Glioma | 186 |
| Serum | 44 | Glioblastoma  | 69 |
| Plasma | 12 | Other Astrocytoma | 20 |
| Peripheral blood | 9 | Oligodendroglioma | 6 |
| Tissue,Serum | 9 | Mixed glioma (Oligoastrocytoma) | 3 |
| Cell lines | 7 | Ependymoma | 1 |
| Cerebrospinal fluid (CSF) | 6 |   |   |
| Serum,Cerebrospinal fluid (CSF) | 2 |   |   |
| Urine | 2 |   |   |
| Plasma,Urine | 1 |   |  |


<br />**Table 2. List of genes/proteins reported as biomarker/signature in at least three different studies**

| gene_symbol | type_of_biomarker | publications |
| --- | --- | --- |
| GFAP | Protein  | 6 |
| MIR21 | RNA  | 6 |
| IDH1 | DNA  | 5 |
| MIR210 | RNA  | 4 |
| OLIG2 | Protein  | 4 |
| FRT1 | Protein  | 3 |
| IDH2 | DNA | 3 |
| MAP2 | Protein | 3 |
| MGMT | Epigenic | 3 |
| MIR124-1 | RNA  | 3 |
| MIR124-2 | RNA  | 3 |
| MIR124-3 | RNA  | 3 |
| MIR15B | RNA  | 3 |
| MIR181B1 | RNA  | 3 |
| MIR221 | RNA  | 3 |

<a name="iYAXR"></a>
## Data dictionary
**Table1: Data dictionary of GalioMarker**

| **Field Name** | **Category** |  |  |  |  |
| :--- | :---: | :---: | :---: | :---: | :---: |
| id | other | Integer | 3 | Unique number ID of biomarker | 2 |
| pmid | literature information | Integer | 8 | PubMed ID of research | 25190548 |
| doi | literature information | Varchar |   | DOL is a string of numbers, letters and symbols used to permanently identify an article or document and link to it on the web | 10.1007/s10072-014-1938-7 |
| publication_time | literature information | Integer | 4 | Year of research publication | 2015 |
| title | literature information | Varchar |   | Research title | Plasma miR-454-3p as a potential prognostic indicator in human glioma |
| abstract | literature information | Varchar |   | Research abstract | Omission |
| keywords | literature information | Varchar |   | Research keywords | MiR-454-3p; Glioma; Diagnosis; Prognosis |
| gene_symbol | biomarker information | Varchar |   | Biomarker’s HUGO gene symbols | MIR454 |
| biomarker | biomarker information | Varchar |   | Biomarker’s full and simple name | miR-454-3p |
| decription | biomarker information | Varchar |   | Description of biomarker | Plasma miR-454-3p could be a novel potential diagnostic biomarker for glioma |
| type_of_biomarker | biomarker information | Varchar |   | Biological type of biomarker (DNA, RNA, Protein...) | RNA Biomarkers |
| type_of_rna_biomarker | biomarker information | Varchar |   | Biological type of RNA (mRNA, miRNA, lncRNA) | miRNA |
| clinical_use | biomarker information | Varchar |   | Clinical use of the biomarker (Diagnositic, Therapeutic,Prognostic, Predictive) | Diagnositic,Prognostic |
| level_of_evidence | biomarker information | Varchar |   | The evdience level of the biomarker(tier1, tier2, tier3, tier4) | tier 3， “Biomarker was verified in pre-clinical research (in vitro or in vivo models)” |
| reserch_region | clinical information | Varchar |   | The region where the biomarker research from | China |
| total_number | clinical information | Integer |   | Number of patients | 70 |
| male | clinical information | Integer |   | Number of male patients | 36 |
| female | clinical information | Integer |   | Number of female patients | 34 |
| mean_age | clinical information | Integer |   | Average age of patients | 47.2 |
| age | clinical information | Integer |   | Patient's age range | 47.2 ± 5.6 |
| stage | clinical information | Integer |   | Cancer stage (I ,II, III, IV) | I,II,III,IV |
| source | experiment information | Varchar |   | Sample source (Cell line, Tissue, Blood...) | Plasma |
| key_experiment_in_paper | experiment information | Varchar |   | key experimental methods for the biomarker in paper | qRT-PCR |
| up_regulator | knowledge | Varchar |   | Up regular of the biomarker | NA |
| down_effector_or_targets | knowledge | Varchar |   | Down effector or target of the biomarker | NA |
| knowledge_points | knowledge | Varchar |   | Concluding sentences in research | 1. The expression levels of miR-454-3p in plasma were signiﬁcantly higher than that from healthy controls   2.The expression levels of miR-4543p in the post-operative plasmas were signiﬁcantly downregulated when compared to the pre-operative plasmas   3.The prognosis of glioma with high miR-454-3p expression was signiﬁcantly worse compared with that of glioma with low miR-454-3p expression 4. Plasma miR-454-3p could be a novel potential diagnostic biomarker for glioma |
| disease_in_paper | disease | Varchar |   | Types of diseases involved in the research | Glioma |
| disease_subtype_in_paper | disease | Varchar |   | Subtype of the disease | Glioma |
| disease_type | disease | Varchar |   | Type of disease | Glioma |
| sensitivity | statistics | Integer |   | ROC sensitivity index | 0.9905 |
| specificity | statistics | Integer |   | ROC specificity index | 0.8286 |
| area_under_the_curve | statistics | Integer |   | AUC value of the ROC | 0.9063 |
| supplementary_statistics | statistics | Varchar |   | Other statistical results for the biomarker | The ROC curves analysis showed that at the optimal cut-off, plasma miR-454-3p had a 99.05 % sensitivity and a 82.86 % specificity and the area under the ROC curve (AUC) was 0.9063 [95 % confidence interval (CI): 0.8487–0.9639)] |

<a name="iUHs2"></a>
## Attachments
[GlioMarkers Tables_QW_Edited.docx](https://www.yuque.com/attachments/yuque/0/2021/docx/348173/1616247266143-36e8a9ce-0dfc-47c8-a24e-74b1657808fe.docx?_lake_card=%7B%22uid%22%3A%221616247266037-0%22%2C%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2021%2Fdocx%2F348173%2F1616247266143-36e8a9ce-0dfc-47c8-a24e-74b1657808fe.docx%22%2C%22name%22%3A%22GlioMarkers+Tables_QW_Edited.docx%22%2C%22size%22%3A21158%2C%22type%22%3A%22%22%2C%22ext%22%3A%22docx%22%2C%22progress%22%3A%7B%22percent%22%3A99%7D%2C%22status%22%3A%22done%22%2C%22percent%22%3A0%2C%22id%22%3A%22CBt8E%22%2C%22refSrc%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2021%2Fdocx%2F348173%2F1616247266143-36e8a9ce-0dfc-47c8-a24e-74b1657808fe.docx%22%2C%22card%22%3A%22file%22%7D)<br />[GlioMarker_Figures.pptx](https://www.yuque.com/attachments/yuque/0/2021/pptx/348173/1616246852751-c71aa5d7-85a4-4bda-8d7e-ee3f0dd4ee7c.pptx?_lake_card=%7B%22uid%22%3A%221616245736068-0%22%2C%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2021%2Fpptx%2F348173%2F1616246852751-c71aa5d7-85a4-4bda-8d7e-ee3f0dd4ee7c.pptx%22%2C%22name%22%3A%22GlioMarker_Figures.pptx%22%2C%22size%22%3A437862%2C%22type%22%3A%22%22%2C%22ext%22%3A%22pptx%22%2C%22progress%22%3A%7B%22percent%22%3A99%7D%2C%22status%22%3A%22done%22%2C%22percent%22%3A0%2C%22id%22%3A%22ibm9r%22%2C%22refSrc%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2021%2Fpptx%2F348173%2F1616246852751-c71aa5d7-85a4-4bda-8d7e-ee3f0dd4ee7c.pptx%22%2C%22card%22%3A%22file%22%7D)
