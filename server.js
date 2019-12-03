const http =  require('http');
const app = require('./app');

const port = process.env.PORT || 8080;

const server = http.createServer(app);

server.listen(port,"192.168.0.102");

// server.listen(port,"192.168.1.3");

console.log(`Server running at:`+ port);