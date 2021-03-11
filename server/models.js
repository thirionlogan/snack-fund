const db = require('./data/db');
const bookshelf = require('bookshelf')(db);

const Transaction = bookshelf.model('Transaction', {
  tableName: 'transaction',
  user() {
    return this.belongsTo(User);
  },
});

const User = bookshelf.model('User', {
  tableName: 'user',
  transactions() {
    return this.hasMany(Transaction).query().sum('amount');
  },
});

module.exports = { User, Transaction };
