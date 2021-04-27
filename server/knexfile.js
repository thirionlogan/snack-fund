require('dotenv').config({ path: '../.env' });
const path = require('path');
const migrations = path.resolve(__dirname, './data/migrations');
const seeds = path.resolve(__dirname, './data/seeds');
const filename = path.join(__dirname, './snack_fund_db.sqlite');

const defaultConnection = {
  client: 'sqlite3',
  connection: {
    filename: filename,
  },
  useNullAsDefault: true,
  migrations: {
    directory: migrations,
  },
  seeds: { directory: seeds },
};

module.exports = {
  development: defaultConnection,
  test: {
    ...defaultConnection,
    connection: ':memory:',
  },
  staging: defaultConnection,
  production: defaultConnection,
};
