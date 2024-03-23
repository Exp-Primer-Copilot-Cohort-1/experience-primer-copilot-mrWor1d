// right a simple code to show something on mozilla browser 
// using node.js

require('http').createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('<h1>Hello World</h1>');
}).listen(3000, '');