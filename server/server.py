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

fname = ["sunny","cloudy","rainy/snowy","tired","coffee","bathroom","avoid crowd","curiousity","printer","campus event","hurry","fresh air","meet friend"]
preference = []
label = []
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
            label.append(map(int,map(float,featarr)))

for i in range(0,len(label)):
    if(label[i][7] < 1500):
        label[i][7] = 1
    elif(label[i][7] < 2500):
        label[i][7] = 2
    else:
        label[i][7] = 3

x = numpy.array(label)
y = x.T

def drawDecisionTree(classIndex):
    clf = tree.DecisionTreeClassifier()
    clf = clf.fit(preference,y[classIndex])
    return clf

def handlework(content):
    print(content)
    content = content[1:-2]
    content = content.replace("\"","")
    labelarr = content.split(",")
    labelarr = labelarr[1:]
    intlabelarr = map(int,labelarr)
    trees = []
    result = []
    for i in range (1,9):
        result.append(drawDecisionTree(i).predict(intlabelarr)[0])
    for res in result:
        print(res)
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
    return choice

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
