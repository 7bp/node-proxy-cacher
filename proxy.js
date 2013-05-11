var http = require('http'), 
  sys = require('sys'),
  fs = require('fs'),
  crypto = require('crypto');

if (process.argv.length <= 2) {
  console.log('node proxy.js HOST [PORT=80] [LOCALPORT=8080] [PARAMS]');
  console.log('HOST - remote host address');
  console.log('PORT - remote host port');
  console.log('LOCALPORT - local port for proxy-cache access');
  console.log('PARAMS - if set: defines the cache identifier, delimiter = ,');
  console.log('--');
  console.log('Example:');
  console.log('node proxy.js remotehost.com 80 8080 articleid,languageid');
  process.exit(0);
}

var serverPort = process.argv[4] || 8080;
var filter = process.argv[5] || false;

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

  /**
  * Cache identifier will be defined. If cache identifier is empty, complete request url will be
  * used as fallback identifier - which means: any image, or other request type will most likely 
  * cached regarding their absolute url.
  */
  var cacheIdentifier = [];
  if (filter && request.url.indexOf('?') !== -1) {
    var path = request.url.substring(0, request.url.indexOf('?'));
    var query = request.url.substring(path.length + 1).split('&');
    var parameters = {};
    for (var i = query.length - 1; i >= 0; i--) {
      var param = query[i].split('=');
      parameters[param[0]] = param[1];
    }
    cacheIdentifier.push(path);
    for (var i = filter.length - 1; i >= 0; i--) {
      if (parameters[filter[i]]) {
        cacheIdentifier.push(filter[i] + '=' + parameters[filter[i]]);
      }
    }
  }
  if (cacheIdentifier.length === 0) {
    cacheIdentifier.push(request.url);
  }

  var md5Hash = crypto.createHash('md5').update(cacheIdentifier.join('&')).digest('hex');
  var cacheFileName = __dirname + '/cache/' + md5Hash;
  var cacheHeaderFileName = __dirname + '/cache_headers/' + md5Hash;

  if (fs.existsSync(cacheFileName)) {
    sys.log('CACHE ' + cacheIdentifier.join('&'));

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
        sys.log('FETCH ' + cacheIdentifier.join('&') + ' - ' + request.url);
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