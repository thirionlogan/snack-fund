const db = require('./data/db');
const bookshelf = require('bookshelf')(db);

const Transaction = bookshelf.model('Transaction', {
  tableName: 'transactions',
  hasTimestamps: true,
  user() {
    return this.belongsTo(User);
  },
});

const User = bookshelf.model('User', {
  tableName: 'user',
  hasTimestamps: true,
  balance() {
    return this.hasMany(Transaction);
  },
});

module.exports = { User, Transaction };
