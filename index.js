const http = require('http');

const port = 8080
const server = http.createServer((req, res) => {
  res.end("Ok");
})

server.listen(port, () => {
  console.log('Listening on:\n Localhost: ' + 'http://localhost:');
})