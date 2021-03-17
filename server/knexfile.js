require('dotenv').config({ path: '../.env' });
const path = require('path');

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './mydb.sqlite',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },
  test: {
    ...{
      client: 'sqlite3',
      connection: {
        filename: './mydb.sqlite',
      },
      useNullAsDefault: true,
      migrations: {
        directory: './server/data/migrations',
      },
      seeds: { directory: './server/data/seeds' },
    },
    connection: ':memory:',
  },
  staging: {
    client: 'sqlite3',
    connection: {
      filename: './mydb.sqlite',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: './mydb.sqlite',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },
};
