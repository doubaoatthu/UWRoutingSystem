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
            self.wfile.write("test")

Handler = ServerHandler
httpd = SocketServer.TCPServer(("", 8000), Handler)
httpd.serve_forever()
