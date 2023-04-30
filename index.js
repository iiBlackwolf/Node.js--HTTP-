const http = require('http');

let users = [
  {name:"Joe", age:30, city:"New York"},
  {name:"Rick", age:48, city:"London"}
]

const port = 8080

async function handleGetRequest(req, res) {
  const { pathname } = new URL(req.url, `http://${req.headers.host}`);
  let data = [];

  switch (pathname) {
    case '/':
      return res.end('Server is running...');
    case '/users':
      data.push(users);
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

server.listen(port, () => {
  console.log('Listening on:\n Localhost: ' + 'http://localhost:' + port);
})
