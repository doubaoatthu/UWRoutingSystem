from sklearn import tree
from sklearn.externals.six import StringIO
from IPython.display import Image
import os
import pydot
x = [[0,0],[1,1],[2,2]]
y = [0,1,2]
clf = tree.DecisionTreeClassifier()
clf = clf.fit(x,y)
z = clf.predict([[2,2]])
w = clf.predict_proba([[2.,2.]])
print(z)
print(w)
with open("test.dot", "w") as f:
	f = tree.export_graphviz(clf, out_file=f)
dot_data = StringIO()
features = ["feature1","feature2"]
classname = ["class1","class2","class3"]
tree.export_graphviz(clf, out_file=dot_data,feature_names= features,filled=True, rounded=True, special_characters=True)
graph = pydot.graph_from_dot_data(dot_data.getvalue())
Image(graph.create_png())