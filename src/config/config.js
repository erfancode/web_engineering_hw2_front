let server = 'http://web-engineering-hw2.herokuapp.com';

const env = process.env.NODE_ENV;

if (env === 'development') {
  server = 'http://localhost:9000';
}

module.exports = server;