from urllib import request
import json
GEPIA='http://118.190.148.166/GEPIA2/'
TCGATumor=['ACC_Tumor', 'BLCA_Tumor', 'BRCA_Tumor', 'CESC_Tumor', 'CHOL_Tumor', 'COAD_Tumor', 'DLBC_Tumor', 'ESCA_Tumor', 'GBM_Tumor', 'HNSC_Tumor', 'KICH_Tumor', 'KIRC_Tumor', 'KIRP_Tumor', 'LAML_Tumor', 'LGG_Tumor', 'LIHC_Tumor', 'LUAD_Tumor', 'LUSC_Tumor', 'MESO_Tumor', 'OV_Tumor', 'PAAD_Tumor', 'PCPG_Tumor', 'PRAD_Tumor', 'READ_Tumor', 'SARC_Tumor', 'SKCM_Tumor', 'STAD_Tumor', 'TGCT_Tumor', 'THCA_Tumor', 'THYM_Tumor', 'UCEC_Tumor', 'UCS_Tumor', 'UVM_Tumor']
TCGANormal=['BLCA_Normal', 'BRCA_Normal', 'CESC_Normal', 'CHOL_Normal', 'COAD_Normal', 'ESCA_Normal', 'HNSC_Normal', 'KICH_Normal', 'KIRC_Normal', 'KIRP_Normal', 'LIHC_Normal', 'LUAD_Normal', 'LUSC_Normal', 'PAAD_Normal', 'PCPG_Normal', 'PRAD_Normal', 'READ_Normal', 'SARC_Normal', 'SKCM_Normal', 'STAD_Normal', 'THCA_Normal', 'THYM_Normal', 'UCEC_Normal']
GTEx=['Adipose_Subcutaneous', 'Adipose_Visceral_Omentum', 'Adrenal_Gland', 'Bladder', 'Cells_EBV-transformed_lymphocytes', 'Artery_Aorta', 'Artery_Coronary', 'Artery_Tibial', 'Whole_Blood', 'Cells_Leukemia_cell_line_CML', 'Brain_Amygdala', 'Brain_Anterior_cingulate_cortex_BA24', 'Brain_Caudate_basal_ganglia', 'Brain_Cerebellar_Hemisphere', 'Brain_Cerebellum', 'Brain_Cortex', 'Brain_Frontal_Cortex_BA9', 'Brain_Hippocampus', 'Brain_Hypothalamus', 'Brain_Nucleus_accumbens_basal_ganglia', 'Brain_Putamen_basal_ganglia', 'Brain_Spinal_cord_cervical_c-1', 'Brain_Substantia_nigra', 'Breast_Mammary_Tissue', 'Cervix_Ectocervix', 'Cervix_Endocervix', 'Colon_Sigmoid', 'Colon_Transverse', 'Esophagus_Gastroesophageal_Junction', 'Esophagus_Mucosa', 'Esophagus_Muscularis', 'Fallopian_Tube', 'Heart_Atrial_Appendage', 'Heart_Left_Ventricle', 'Kidney_Cortex', 'Liver', 'Lung', 'Muscle_Skeletal', 'Nerve_Tibial', 'Ovary', 'Pancreas', 'Pituitary', 'Prostate', 'Minor_Salivary_Gland', 'Cells_Transformed_fibroblasts', 'Skin_Not_Sun_Exposed_Suprapubic', 'Skin_Sun_Exposed_Lower_leg', 'Small_Intestine_Terminal_Ileum', 'Spleen', 'Stomach', 'Testis', 'Thyroid', 'Uterus', 'Vagina']
CANCERType=['ACC', 'BLCA', 'BRCA', 'CESC', 'CHOL', 'COAD', 'DLBC', 'ESCA', 'GBM', 'HNSC', 'KICH', 'KIRC', 'KIRP', 'LAML', 'LGG', 'LIHC', 'LUAD', 'LUSC', 'MESO', 'OV', 'PAAD', 'PCPG', 'PRAD', 'READ', 'SARC', 'SKCM', 'STAD', 'TGCT', 'THCA', 'THYM', 'UCEC', 'UCS']
class similar:
    def __init__(self):
        self.params={
        "dataset": ["BLCA_Normal","ACC_Tumor"],
        "signature": ["CCR7","SELL","IL7R"],
        "top_num": "100"}
        self.out_dir='./'
    def setOutDir(self,s):
        self.out_dir=s
    def showParams(self):
        for i in self.params:
            print(i+':',end=' ')
            print(self.params[i])
    def setParam(self,key,value):
        self.params[key]=value
    def setParams(self,params):
        self.params=params
    def trans(self,s):
        if type(s)==str:
            s=[s]
        if type(s)!=list:
            return str(s)
        return ','.join(s)
    def query(self):
        PHP='assets/PHP4/GET_similar_zf.php?'
        params=self.params
        req=GEPIA+PHP
        for i in self.params:
            req+='&'+i+'='+self.trans(params[i])
        ret=request.urlopen(req).read()
        if ret!=b'  Unable to open file!':
            pdf=json.loads(ret)['outdir']
            print(self.out_dir+pdf)
            self.url=GEPIA+'tmp/'+pdf
            request.urlretrieve (self.url, self.out_dir+pdf)
            return self.out_dir+pdf
        else:
            print('Error! Please check your parameters.')
            self.showParams()
            return None

class correlation:
    def __init__(self):
        self.params={
        "dataset":["BRCA_Tumor","BLCA_Tumor"],
        "methodoption":"pearson",
        "signature1": ["CX3CR1","FGFBP2","FCGR3A"],
        "signature1_norm": "FOXP3",
        "signature2": ["PDCD1","DUSP4","GZMK","GZMA","IFNG"],
        "signature2_norm": "FOXP3"}
        self.out_dir='./'
    def setOutDir(self,s):
        self.out_dir=s
    def showParams(self):
        for i in self.params:
            print(i+':',end=' ')
            print(self.params[i])
    def setParam(self,key,value):
        self.params[key]=value
    def setParams(self,params):
        self.params=params
    def trans(self,s):
        if type(s)==str:
            s=[s]
        if type(s)!=list:
            return str(s)
        return ','.join(s)
    def query(self):
        PHP='assets/PHP4/GET_correlation_zf.php?'
        params=self.params
        req=GEPIA+PHP
        for i in self.params:
            req+='&'+i+'='+self.trans(params[i])
        #print(req)
        ret=request.urlopen(req).read()
        if json.loads(ret)['status']==0:
            pdf=json.loads(ret)['outdir']
            print(self.out_dir+pdf)
            self.url=GEPIA+'tmp/'+pdf
            request.urlretrieve (self.url, self.out_dir+pdf)
            return self.out_dir+pdf
        else:
            print('Error! Please check your parameters.')
            self.showParams()
            return None

class boxplot:
    def __init__(self):
        self.params={
        "color1": "#ff6666",
        "color2": "#7f7f7f",
        "dataset": ["BLCA","BRCA","CESC"],
        "fccutoff": "",
        "iflog": "yes",
        "ifstack": "yes",
        "is_sub": "false",
        "jittersize": "0.4",
        "matchdata": "NG",
        "qcutoff": "",
        "signature": ["CCR7","SELL","IL7R"],
        "subtype": ""}
        self.out_dir='./'
    def setOutDir(self,s):
        self.out_dir=s
    def showParams(self):
        for i in self.params:
            print(i+':',end=' ')
            print(self.params[i])
        print('out_dir:'+self.out_dir)
    def setParam(self,key,value):
        self.params[key]=value
    def setParams(self,params):
        self.params=params
    def trans(self,s):
        if type(s)==str:
            s=[s.replace('#','%23')]
        if type(s)!=list:
            return str(s)
        return ','.join(s)
    def query(self):
        PHP='assets/PHP4/GET_boxplot_subtype_zf.php?'
        params=self.params
        req=GEPIA+PHP
        for i in self.params:
            req+='&'+i+'='+self.trans(params[i])
        #print(req)
        ret=request.urlopen(req).read()
        if json.loads(ret)['outdir']!='fail':
            pdf=json.loads(ret)['outdir']
            print(self.out_dir+pdf)
            self.url=GEPIA+'tmp/'+pdf
            request.urlretrieve (self.url, self.out_dir+pdf)
            return self.out_dir+pdf
        else:
            print('Error! Please check your parameters.')
            self.showParams()
            return None
        
class survival:
    def __init__(self):
        self.params={
        "axisunit": "month",
        "dataset": "BLCA",
        "groupcutoff1": "50",
        "groupcutoff2": "50",
        "highcol": "#ff0000",
        "ifconf": "conf",
        "ifhr": "hr",
        "is_sub": "false",
        "lowcol": "#0000ff",
        "methodoption": "os",
        "signature": ["CCR7","SELL","IL7R"],
        "signature_norm": "",
        "subtype": ""}
        self.out_dir='./'
    def setOutDir(self,s):
        self.out_dir=s
    def showParams(self):
        for i in self.params:
            print(i+':',end=' ')
            print(self.params[i])
        print('out_dir:'+self.out_dir)
    def setParam(self,key,value):
        self.params[key]=value
    def setParams(self,params):
        self.params=params
    def trans(self,s):
        if type(s)==str:
            s=[s.replace('#','%23')]
        if type(s)!=list:
            return str(s)
        return ','.join(s)
    def query(self):
        PHP='assets/PHP4/GET_survival_zf.php?'
        params=self.params
        req=GEPIA+PHP
        for i in self.params:
            req+='&'+i+'='+self.trans(params[i])
        #print(req)
        ret=request.urlopen(req).read()
        if json.loads(ret)['outdir']!='fail':
            pdf=json.loads(ret)['outdir']
            print(self.out_dir+pdf)
            self.url=GEPIA+'tmp/'+pdf
            request.urlretrieve (self.url, self.out_dir+pdf)
            return self.out_dir+pdf
        else:
            print('Error! Please check your parameters.')
            self.showParams()
            return None

class survival_map:
    def __init__(self):
        self.params={
        "cutoff1": "50",
        "cutoff2": "50",
        "dataset":["ACC,BLCA,BRCA,CESC,CHOL,COAD,DLBC,ESCA,GBM,HNSC,KICH,KIRC,KIRP,LAML,LGG,LIHC,LUAD,LUSC,MESO,OV,PAAD,PCPG,PRAD,READ,SARC,SKCM,STAD,TGCT,THCA,THYM,UCEC,UCS"],
        "method": "os",
        "signature": ["ERBB2","ERBB2-001"],
        "signif": "0.05"}
        self.out_dir='./'
    def setOutDir(self,s):
        self.out_dir=s
    def showParams(self):
        for i in self.params:
            print(i+':',end=' ')
            print(self.params[i])
        print('out_dir:'+self.out_dir)
    def setParam(self,key,value):
        self.params[key]=value
    def setParams(self,params):
        self.params=params
    def trans(self,s):
        if type(s)==str:
            s=[s.replace('#','%23')]
        if type(s)!=list:
            return str(s)
        return ','.join(s)
    def query(self):
        PHP='assets/PHP4/GET_survival_map.php?'
        params=self.params
        req=GEPIA+PHP
        for i in self.params:
            req+='&'+i+'='+self.trans(params[i])
        #print(req)
        ret=request.urlopen(req).read()
        if json.loads(ret)['outdir']!='fail':
            pdf=json.loads(ret)['outdir']
            print(self.out_dir+pdf)
            self.url=GEPIA+'tmp/'+pdf
            request.urlretrieve (self.url, self.out_dir+pdf)
            return self.out_dir+pdf
        else:
            print('Error! Please check your parameters.')
            self.showParams()
            return None