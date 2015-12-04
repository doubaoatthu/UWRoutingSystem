from sklearn import tree
from sklearn.externals.six import StringIO
from IPython.display import Image
import os
import pydot
import numpy 
# x = [[0,0],[1,1],[2,2]]
# y = [0,1,2]
# clf = tree.DecisionTreeClassifier()
# clf = clf.fit(x,y)
# z = clf.predict([[2,2]])
# w = clf.predict_proba([[2.,2.]])
# print(z)
# print(w)
# with open("test.dot", "w") as f:
# 	f = tree.export_graphviz(clf, out_file=f)
# dot_data = StringIO()
# features = ["feature1","feature2"]
# classname = ["class1","class2","class3"]
# tree.export_graphviz(clf, out_file=dot_data,feature_names= features,filled=True, rounded=True, special_characters=True)
# graph = pydot.graph_from_dot_data(dot_data.getvalue())
# Image(graph.create_png())
preference = []
label = []
with open("labeled_survey.txt") as f:
	contents = f.readlines()
	for content in contents:
		content = content[1:-2]
		content = content.replace("\"","")
		labelarr = content.split(",")
		labelarr = labelarr[1:]
		intlabelarr = map(int,labelarr)
		preference.append(intlabelarr)

with open("labeled_path.txt") as f:
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
print(label)

x = numpy.array(label)
y = x.T
print(y[1])
for i in range(0,len(y[1])):
	if(y[1][i] >2):
		y[1][i] = 2

fname = ["sunny","cloudy","rainy/snowy","tired","coffee","bathroom","avoid crowd","curiousity","printer","campus event","hurry","fresh air","meet friend"]
cname = ["not using stairs","use a little","use a lot"]
clf = tree.DecisionTreeClassifier()
clf = clf.fit(preference,y[5])
with open("a.dot", "w") as f:
	f = tree.export_graphviz(clf, out_file=f)
dot_data = StringIO()
tree.export_graphviz(clf, out_file=dot_data,feature_names= fname, class_names=cname)
graph = pydot.graph_from_dot_data(dot_data.getvalue())
Image(graph.create_png())


