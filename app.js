const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
res.end('Hello from Jenkins CI/CD – Auto deployed 🚀......progressing da kumara....keep going...and now trigger is added da kumaraaaaa...getting late da ');
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
