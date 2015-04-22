let http = require('http');
let request = require('request');
let argv = require('yargs')
    .default('host', '127.0.0.1')
    .argv
let scheme = 'http://'
let port = argv.port || argv.host === '127.0.0.1' ? 8000 : 80

// Build the destinationUrl using the --host value
// Update our destinationUrl line from above to include the port
let destinationUrl = argv.url || scheme + argv.host + ':' + port

let outputStream = argv.log ? fs.createWriteStream(argv.log) : process.stdout


//Echo server
console.log("listening Echo server on " + port);

console.log("destinationUrl: " + destinationUrl);

http.createServer((req, res) => {
    console.log('Request received at: ' + req.url);
    // Log the req headers and content in our server callback
    outputStream.write('\n\n\n' + JSON.stringify(req.headers, null, '\t'))
    req.pipe(outputStream)

    for (let header in req.headers) {
        res.setHeader(header, req.headers[header])
    }
    req.pipe(res);
}).listen(port);



//Proxy Server
http.createServer((req, res) => {




    console.log('\nProxying request to: ' + destinationUrl + req.url);
    let options = {
        headers: req.headers,
        url: req.headers['x-destination-url'] ||  (destinationUrl + req.url)
    }
    options.method = req.method;


    //Log the proxy request headers and content in our server callback
    let downstreamResponse = req.pipe(request(options))
    outputStream.write(JSON.stringify(downstreamResponse.headers))
    downstreamResponse.pipe(outputStream)
    downstreamResponse.pipe(res)




}).listen(8001);