'use strict';

module.exports = {
  env: 'development',
  port: 5000,
  host: '0.0.0.0',
  secret: '~~~~',
  database: 'mongodb://localhost/transports',
  testDatabase: 'mongodb://localhost/test-transports',
  testPort: 5001,
};
