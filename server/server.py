import SimpleHTTPServer
import SocketServer
import logging
from sklearn import tree
from sklearn.externals.six import StringIO
from IPython.display import Image
import os
import pydot
import numpy 
from urlparse import urlparse, parse_qs
import math

preferenceName = ["sunny","cloudy","rainy/snowy","tired","coffee","bathroom","avoid crowd","curiousity","printer","campus event","hurry","fresh air","meet friend"]
propertyName = ["empty", "num of stairs", "levels of elevators", "num of exits", "is near coffee shop", "is near a printer", "is near a bathroom", "distance", "does keep inside"]
propertyValues = [
    ["empty"],
    ["0 stair", "1 stairs", "2 stairs", "3 stairs", "4 stairs"],
    ["0 level of elevator", "1 levels of elevator", "2 levels of elevator"],
    ["0 exit", "1 exit"],
    ["not near coffee shop", "near coffee shop"],
    ["not near printer", "near printer"],
    ["not near bathroom", "near bathroom"],
    ["close", "normal", "far"],
    ["keep inside", "go outside"]
    ]
numPhysicalProperties = 9
pref_distanceIndex = 7

preference = []
labels = []
with open("./data/survey.txt") as f:
    contents = f.readlines()
    for content in contents:
        content = content[1:-2]
        content = content.replace("\"","")
        labelarr = content.split(",")
        labelarr = labelarr[1:]
        intlabelarr = map(int,labelarr)
        preference.append(intlabelarr)

with open("./data/path.txt") as f:
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
            labels.append(map(int,map(float,featarr)))

def normalizeLabel(label):
    if(label[7] < 1500):
        label[7] = 1
    elif(label[7] < 2500):
        label[7] = 2
    else:
        label[7] = 3
	
for i in range(0,len(labels)):
    normalizeLabel(labels[i])
    print labels[i]
    print "*********"

classNames = map(str, range(len(labels)))
x = numpy.array(labels)
y = x.T

physicalPropertyDecisionTrees = []

def decisionTreeFromPreferenceToPhysicalProperty(physicalIndex):
    clf = tree.DecisionTreeClassifier()
    clf = clf.fit(preference,y[physicalIndex])
    return clf

def drawDecisionTree(dt, filename, featureNames, classNames):
    dot_data = StringIO()
    print featureNames
    print classNames
    tree.export_graphviz(dt, out_file=dot_data, feature_names=featureNames, class_names=classNames, rounded=True, special_characters=True, label=None, proportion=True, impurity=False)
    graph = pydot.graph_from_dot_data(dot_data.getvalue())
    graph.write_png(filename) 

for i in range(numPhysicalProperties):
    physicalPropertyDecisionTrees.append(decisionTreeFromPreferenceToPhysicalProperty(i))
    if i == 0 or i == 5:
        continue
    drawDecisionTree(physicalPropertyDecisionTrees[i], "decision_tree_" + str(i) + ".png", preferenceName, propertyValues[i])

routeDecisionTree = tree.DecisionTreeClassifier()
routeDecisionTree = routeDecisionTree.fit(labels, range(len(labels)))
drawDecisionTree(routeDecisionTree, "routeDT.png", propertyName, classNames)

def handlework(content):
    print(content)
    content = content[1:-2]
    content = content.replace("\"","")
    labelarr = content.split(",")[1:]
    print labelarr
    intlabelarr = map(int,labelarr)
    normalizeLabel(intlabelarr)
    trees = []
    physicalProperties = []
    for i in range(numPhysicalProperties):
        physicalProperties.append(physicalPropertyDecisionTrees[i].predict(intlabelarr)[0])
    print physicalProperties
    index = routeDecisionTree.predict(physicalProperties)[0]
    print labels[i]
    return index
   
def search(origin, destination):
    return 0

class ServerHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    def do_GET(self):
        logging.warning(self.path)
        parseResult = urlparse(self.path)
        if (parseResult.path == "/json"):
            query = parse_qs(parseResult.query)
            if (('origin' in query) and ('destination' in query)):
                origin = query['origin'][0]
                destination = query['destination'][0]
                print origin, destination
                search(origin, destination)
            else:
                return
        elif(parseResult.path == "/sendpath"):
            query = parse_qs(parseResult.query)
            print(query)
        else:
            SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self)
    def do_POST(self):
        parseResult = urlparse(self.path)
        content_len = int(self.headers.getheader('content-length', 0))
        post_body = self.rfile.read(content_len)
        print(parseResult.path, post_body)
        if(parseResult.path == "/sendpath"):
            f = open("./path.txt","a")
            f.write(post_body)
            f.write("\n")
            f.close()
            self.send_response(200)
        elif (parseResult.path == "/sendsurvey"):
            f = open("./survey.txt", "a")
            f.write(post_body)
            f.write("\n")
            f.close()
            self.send_response(200)
        elif (parseResult.path == "/getpath"):
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(handlework(post_body))

Handler = ServerHandler
httpd = SocketServer.TCPServer(("", 8000), Handler)
httpd.serve_forever()
