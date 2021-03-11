require('dotenv').config({ path: '../.env' });

const localfile = {
  client: 'sqlite3',
  connection: {
    filename: './mydb.sqlite',
  },
  useNullAsDefault: true,
  migrations: {
    directory: './data/migrations',
  },
  seeds: { directory: './data/seeds' },
};

module.exports = {
  development: localfile,
  test: {
    ...localfile,
    connection: ':memory:',
  },
  staging: localfile,
  production: localfile,
};
