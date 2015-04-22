let http = require('http');
let fs = require('fs');
let request = require('request');
let argv = require('yargs')
    .default('host', '127.0.0.1')
    .argv

let scheme = 'http://'
let port = argv.port ||  8000 

// Build the destinationUrl using the --host value
// Update our destinationUrl line from above to include the port
let destinationUrl = argv.url || scheme + argv.host + ':' + port

let outputStream = argv.mylog ? fs.createWriteStream(argv.mylog) : process.stdout

//Echo server
outputStream.write("\nlistening Echo server on " + port);
outputStream.write("\ndestinationUrl: " + destinationUrl);

http.createServer((req, res) => {
    // Log the req headers and content in our server callback
    outputStream.write('\n' + JSON.stringify(req.headers, null, '\t'))
    //req.pipe(outputStream)

    for (let header in req.headers) {
        res.setHeader(header, req.headers[header])
    }
    req.pipe(res);
}).listen(port);



//Proxy Server
http.createServer((req, res) => {
    outputStream.write('\nProxying request to: ' + destinationUrl + req.url);
    let options = {
        headers: req.headers,
        url: req.headers['x-destination-url'] ||  (destinationUrl + req.url)
    }
    options.method = req.method;


    //Log the proxy request headers and content in our server callback
    let downstreamResponse = req.pipe(request(options))
    outputStream.write("\n"+JSON.stringify(downstreamResponse.headers))
    downstreamResponse.pipe(outputStream)
    downstreamResponse.pipe(res)




}).listen(8001);