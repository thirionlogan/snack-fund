require('dotenv').config({ path: '../.env' });
const path = require('path');
const migrations = path.resolve(__dirname, './data/migrations');
const seeds = path.resolve(__dirname, './data/seeds');

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './mydb.sqlite',
    },
    useNullAsDefault: true,
    migrations: {
      directory: migrations,
    },
    seeds: { directory: seeds },
  },
  test: {
    client: 'sqlite3',
    connection: ':memory:',
    useNullAsDefault: true,
    migrations: {
      directory: './server/data/migrations',
    },
    seeds: { directory: './server/data/seeds' },
  },
  staging: {
    client: 'sqlite3',
    connection: {
      filename: './mydb.sqlite',
    },
    useNullAsDefault: true,
    migrations: {
      directory: migrations,
    },
    seeds: { directory: seeds },
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: './mydb.sqlite',
    },
    useNullAsDefault: true,
    migrations: {
      directory: migrations,
    },
    seeds: { directory: seeds },
  },
};
