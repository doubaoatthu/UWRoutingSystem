import SimpleHTTPServer
import SocketServer
import logging

from urlparse import urlparse, parse_qs

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
        
        if(parseResult.path == "/sendpath"):
            print("do post post lala")
            content_len = int(self.headers.getheader('content-length', 0))
            post_body = self.rfile.read(content_len)
            print(post_body)
            f = open("data.txt","a")
            f.write(post_body)
            f.write("\n")


Handler = ServerHandler
httpd = SocketServer.TCPServer(("", 8000), Handler)
httpd.serve_forever()
