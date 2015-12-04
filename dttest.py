from sklearn import tree
from sklearn.externals.six import StringIO
from IPython.display import Image
import os
import pydot
import numpy 

preference = []
label = []
with open("data/survey.txt") as f:
	contents = f.readlines()
	for content in contents:
		content = content[1:-2]
		content = content.replace("\"","")
		labelarr = content.split(",")
		labelarr = labelarr[1:]
		intlabelarr = map(int,labelarr)
		preference.append(intlabelarr)

with open("data/path.txt") as f:
	contents = f.readlines()
	for content in contents:
		print(content)
		fstring = content.split("feature")
		if(len(fstring) > 1):
			print(1)
			features = fstring[1]
			features = features[3:-4]
			featarr = features.split(",")
			for i in range(0,len(featarr)):
				if(featarr[i] == "true"):
					featarr[i] = "1"
				if(featarr[i] == "false"):
					featarr[i] = "0"
			label.append(map(int,map(float,featarr)))

print(preference)
print("##################")
print(len(label))
print(len(label[0]))
print("##################")
print(len(label))

print(map(len, label))
y = numpy.transpose(label)
print(len(y))
print("##################")
print(len(y[5]))
for i in range(0,len(y[1])):
	if(y[1][i] >2):
		y[1][i] = 2

fname = ["sunny","cloudy","rainy/snowy","tired","coffee","bathroom","avoid crowd","curiousity","printer","campus event","hurry","fresh air","meet friend"]
cname = ["not using stairs","use a little","use a lot"]
clf = tree.DecisionTreeClassifier()
clf = clf.fit(preference,y[4])
print y[4]
with open("a.dot", "w") as f:
	f = tree.export_graphviz(clf,out_file=f,feature_names= fname,class_names=cname)
	#f = tree.export_graphviz(clf, out_file=f)
dot_data = StringIO()
#tree.export_graphviz(clf,out_file=dot_data,feature_names= fname,class_names=cname)
tree.export_graphviz(clf,out_file=dot_data,feature_names= fname,class_names=cname,filled=True, rounded=True,special_characters=True)
graph = pydot.graph_from_dot_data(dot_data.getvalue())
graph.write_pdf("a.pdf") 


