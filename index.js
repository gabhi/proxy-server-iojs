let http = require('http')
let destinationUrl = '127.0.0.1:8000'


//Echo server

http.createServer((req, res) => {
    console.log('Request received at: ${req.url}');
    for (let header in req.headers) {
        res.setHeader(header, req.headers[header])
    }
    req.pipe(res);
}).listen(8000)