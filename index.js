const http = require('http');
const data = require('./data.js')
const config = require('./config.json')

const db = new data()

async function handleGetRequest(req, res) {
  const { pathname } = new URL(req.url, `http://${req.headers.host}`);
  let data = [];

  switch (pathname) {
    case '/':
      return res.end('Server is running...');
    case '/users':
      data.push(db.GetUsers());
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify(data));
    default:
      res.statusCode = 404;
      return res.end('404, Requested resource does not exist');
  }
}

const server = http.createServer((req, res) => {

  if (req.method === 'GET') {
    handleGetRequest(req, res);
  }

})

server.listen(config.port, () => {
  console.log('Listening on:\n Localhost: ' + config.protocol + '://' + config.host + ':' + config.port);
})
