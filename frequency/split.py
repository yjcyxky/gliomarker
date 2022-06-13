import pandas as pd


### 读取文件
### 请修改自己文件的所在位置
file=r'gliomarker_v7.xls'
file_2=r'frequency_original.csv'
file_3=r'frequency.csv'



data =  pd.read_excel(file)
#data

data['gene_symbol'] = data['gene_symbol'].astype(str).apply(lambda x: x.split(';'))

data_1 = data.explode('gene_symbol')
data_1['gene_symbol'] = data_1['gene_symbol'].str.replace(r"(\s+)","")
#data_1.to_csv(chaifen)

data_2 = data_1[['gene_symbol','pmid','type_of_biomarker','type_of_rna_biomarker']]
#data_2
data_2.to_csv(file_2)

data_3 = data_2.groupby(['gene_symbol','type_of_biomarker'])['gene_symbol'].count().reset_index(name="publication")
data_3 = data_3[-data_3['gene_symbol'].isin(['nan'])]
data_3 = data_3[data_3['publication'] >= 3]

data_3.to_csv(file_3)



