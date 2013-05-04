var http = require('http'), 
  sys = require('sys'),
  fs = require('fs');  

if (process.argv.length <= 2) {
  console.log('node proxy.js HOST [PORT=80] [LOCALPORT=8080]');
  process.exit(0);
}

var serverPort = process.argv[4] || 8080;

if (!fs.existsSync(__dirname + '/cache')) {
  fs.mkdirSync(__dirname + '/cache');
  fs.mkdirSync(__dirname + '/cache_headers');
}

var files = fs.readdirSync(__dirname + '/cache');
files.forEach(function(file, index){
  fs.unlinkSync(__dirname + '/cache/' + file);
  fs.unlinkSync(__dirname + '/cache_headers/' + file);  
});
sys.log('Deleted ' + files.length + ' cache files');

var proxy = {
  hostname: process.argv[2],
  port: process.argv[3] || 80
};
sys.log('Listening on port ' + serverPort + '...');

http.createServer(function(request, response) {
  var options = {
    hostname: proxy.hostname,
    port: proxy.port,
    path: request.url,
    method: request.method
  };

  var cacheFileName = __dirname + '/cache/' + encodeURIComponent(request.url);
  var cacheHeaderFileName = __dirname + '/cache_headers/' + encodeURIComponent(request.url);

  if (fs.existsSync(cacheFileName)) {
    sys.log(
      'CACHE ' +
      request.connection.remoteAddress + ': ' + 
      request.method + ' ' + request.url +
      ' > ' + proxy.hostname + ':' + proxy.port + request.url);

    response.writeHeader(200, JSON.parse(fs.readFileSync(cacheHeaderFileName)));
    response.write(fs.readFileSync(cacheFileName));
    response.end();
  } else {
    var fd = fs.openSync(cacheFileName, 'w');
    var req = http.request(options, function(res) {
      fs.writeFileSync(cacheHeaderFileName, JSON.stringify(res.headers));
      response.writeHeader(res.statusCode, res.headers);
      res.on('data', function(chunk) {
        response.write(chunk, 'binary');
        var buff = new Buffer(chunk, 'base64');
        fs.writeSync(fd, buff, 0, buff.length);
      });
      res.on('end', function() {
        sys.log(
          'FETCH ' +
          request.connection.remoteAddress + ': ' + 
          request.method + ' ' + request.url +
          ' > ' + proxy.hostname + ':' + proxy.port + request.url);
        fs.closeSync(fd);
        response.end();
      });
    });

    request.on('data', function(chunk) {
      req.write(chunk, 'binary');
    });

    request.on('end', function() {
      req.end();
    });

    req.on('error', function(e) {
      sys.log('ERROR ' + e.message);
    });

    req.end();
  }
}).listen(serverPort);