from sklearn import tree
from sklearn.externals.six import StringIO
from IPython.display import Image
from sklearn.neighbors import KNeighborsClassifier
import os
import pydot
import numpy 
import math
import random
preference = []
label = []
with open("../data/survey.txt") as f:
	contents = f.readlines()
	for content in contents:
		content = content[1:-2]
		content = content.replace("\"","")
		labelarr = content.split(",")
		labelarr = labelarr[1:]
		intlabelarr = map(int,labelarr)
		preference.append(intlabelarr)

with open("../data/path.txt") as f:
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

for i in range(0,len(label)):
	if(label[i][7] < 1500):
		label[i][7] = 1
	elif(label[i][7] < 2500):
		label[i][7] = 2
	else:
		label[i][7] = 3

# print(preference)
# print(label)
# print(len(label))
x = numpy.array(label)
y = x.T

fname = ["sunny","cloudy","rainy/snowy","tired","coffee","bathroom","avoid crowd","curiousity","printer","campus event","hurry","fresh air","meet friend"]

def drawDecisionTree(classIndex):
	clf = tree.DecisionTreeClassifier()
	clf = clf.fit(preference,y[classIndex])
	# dot_data = StringIO()
	# # change it: class_names = cnames[classIndex]
	# tree.export_graphviz(clf,out_file=dot_data,feature_names= fname,filled=True, rounded=True,special_characters=True)
	# graph = pydot.graph_from_dot_data(dot_data.getvalue())
	# filename = "decisionTree_" + str(classIndex) + ".pdf"
	# graph.write_pdf(filename)
	return clf
toparse = []
for i in range(12):
	toparse.append(random.randint(1, 2))
trees = []
result = []
for i in range (1,9):
	result.append(drawDecisionTree(i).predict(toparse)[0])

ix = 0
choice = 0
max = 1000
for l in label:
	dis = 0
	for i in range(0,len(l)-1):
        if(l[i] - result[i] == 0):
            dis = dis - 2
        dis = dis + math.sqrt((l[i] - result[i])*(l[i] - result[i]))
    if(dis < max):
        max = dis
        choice = ix
    ix += 1
print(toparse)
print(choice)

