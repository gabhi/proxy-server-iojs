# Proxy Server

This is a Proxy Server for Node.js submitted as the [pre-work](http://courses.codepath.com/snippets/intro_to_nodejs/prework) requirement for CodePath.

Time spent: [1hr]

##Completed:

* [done] Required: Requests to port `8000` are echoed back with the same HTTP headers and body
* [done] Required: Requests/reponses are proxied to/from the destination server
* [done] Required: The destination server is configurable via the `--host`, `--port`  or `--url` arguments
* [done] Required: The destination server is configurable via the `x-destination-url` header


##Recording of achievements as gif:

[![solarized dualmode](https://github.com/gabhi/proxy-server-iojs/blob/master/animations.gif)](#features)

##to reproduce the gif, plz try any of the following: 

```javascript
//do a npm install first

npm start
curl -v http://127.0.0.1:8001 -H 'x-demo:agaikwad'


nodemon -x babel-node index --port 9000 --mylog=./codepath-proxy.log
curl -v http://127.0.0.1:8001 -H 'x-demo:agaikwad'


babel-node index --mylog=./codepath-proxy.log
curl -v http://127.0.0.1:8001 -H 'x-demo:agaikwad'

nodemon -x babel-node index --port 9000 --mylog=./codepath-proxy.log
curl -v http://127.0.0.1:8001 -H 'x-destination-url:http://127.0.0.1:9000'

```