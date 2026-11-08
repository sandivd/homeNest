const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../build');
if (!fs.existsSync(path.join(root, 'index.html'))) throw new Error('Build HomeNest before running browser tests.');
const types = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.json': 'application/json' };
http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (!pathname.startsWith('/homeNest/')) { res.writeHead(404).end(); return; }
  let file = path.resolve(root, pathname.slice('/homeNest/'.length) || 'index.html');
  if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404).end(); return; }
  res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  fs.createReadStream(file).pipe(res);
}).listen(4180, '127.0.0.1');
