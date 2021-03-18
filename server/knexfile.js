require('dotenv').config({ path: '../.env' });

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
