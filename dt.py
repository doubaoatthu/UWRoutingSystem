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
		fstring = content.split("feature")
		if(len(fstring) > 1):
			features = fstring[1]
			features = features[3:-4]
			featarr = features.split(",")
			for i in range(0,len(featarr)):
				if(featarr[i] == "true"):
					featarr[i] = "1"
				if(featarr[i] == "false"):
					featarr[i] = "0"
			label.append(map(int,map(float,featarr)))

# print(preference)
# print(label)
# print(len(label))
x = numpy.array(label)
print(x)
y = x.T
print("============")
print(y)
print(len(y))
print(len(preference))

fname = ["sunny","cloudy","rainy/snowy","tired","coffee","bathroom","avoid crowd","curiousity","printer","campus event","hurry","fresh air","meet friend"]

def drawDecisionTree(classIndex):
	clf = tree.DecisionTreeClassifier()
	clf = clf.fit(preference,y[classIndex])
	dot_data = StringIO()
	# change it: class_names = cnames[classIndex]
	tree.export_graphviz(clf,out_file=dot_data,feature_names= fname,filled=True, rounded=True,special_characters=True)
	graph = pydot.graph_from_dot_data(dot_data.getvalue())
	filename = "decisionTree_" + str(classIndex) + ".pdf"
	graph.write_pdf(filename) 
for i in range(6,9):
	drawDecisionTree(i)


