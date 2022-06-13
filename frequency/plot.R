library(ggplot2)

data <- read.csv("~/Downloads/frequency_2/frequency.csv")
data <- data[order(data$publication, decreasing = TRUE),]
data$gene_symbol <- factor(data$gene_symbol, levels = data$gene_symbol)
ggplot(data=data, aes(x=gene_symbol, y=publication,fill=type_of_biomarker)) +
  geom_bar(stat="identity") +
  theme(text = element_text(size = 18)) +
  labs(x = "Gene Symbol", y = "Count of Publications", fill = "Type of Biomarker")

