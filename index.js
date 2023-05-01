const http = require('http');
const data = require('./data.js')
const config = require('./config.json')
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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

async function handlePostRequest(req, res) {
  const { pathname } = new URL(req.url, `http://${req.headers.host}`);

  if (pathname === '/adduser') {
    let body = '';

    // Read the data from the request
    req.on('data', chunk => {
      body += chunk.toString();
    });

    // Process the data when the request is finished
    req.on('end', () => {
      try {
        const { name, age, city } = JSON.parse(body);

        // Add the user to the data store
        db.AddUser(name, age, city);

        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 201;
        return res.end(JSON.stringify({ message: 'User added successfully.' }));
      } catch (error) {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 400;
        return res.end(JSON.stringify({ error: error.message }));
      }
    });
  } else {
    res.statusCode = 404;
    return res.end('404, Requested resource does not exist');
  }
}

const server = http.createServer((req, res) => {

  if (req.method === 'GET') {
    return handleGetRequest(req, res);
  } else if (req.method === 'POST') {
    return handlePostRequest(req, res);
  } else {
    res.end('Method not supported!')
  }

})

server.listen(config.port, () => {
  console.log('Listening on:\n Localhost: ' + config.protocol + '://' + config.host + ':' + config.port);

  rl.question('\n Add a user name to handle with "POST" method: ', (answer) => {
    fetch(config.protocol + '://' + config.host + ':' + config.port + '/adduser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: answer,
      age: 25,
      city: 'New York'
    })
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error))
  });
})