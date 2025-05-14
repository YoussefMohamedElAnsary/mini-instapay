const path = require('path');

const env = process.env.NODE_ENV || 'dev'; 
const envPath = path.resolve(__dirname, `../../../envs/.env.${env}`);
require('dotenv').config({ path: envPath });

console.log(`Loaded .env file from: ${envPath}`);
console.log('Loaded Environment Variables:', {
  NODE_ENV: process.env.NODE_ENV,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME_REPORTING_SERVICE || process.env.DB_NAME,
  DB_HOST: process.env.DB_HOST,
  USER_SERVICE_URL: process.env.USER_SERVICE_URL,
  TRANSACTION_SERVICE_URL: process.env.TRANSACTION_SERVICE_URL,
  JWT_SECRET: process.env.JWT_SECRET ? '****' : undefined,
  PORT: process.env.PORT
});

module.exports = {
  dev: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_REPORTING_SERVICE || process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres", 
    dialectOptions: {
      ssl: process.env.DB_SSL === 'true' ? {
        require: true,
        rejectUnauthorized: false
      } : false
    },
    logging: console.log
  },
  staging: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_REPORTING_SERVICE || process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres", 
    dialectOptions: {
      ssl: process.env.DB_SSL === 'true' ? {
        require: true,
        rejectUnauthorized: false
      } : false
    }
  },
  prod: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_REPORTING_SERVICE || process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres", 
    dialectOptions: {
      ssl: process.env.DB_SSL === 'true' ? {
        require: true,
        rejectUnauthorized: false
      } : false
    },
    logging: false
  }
};