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
    console.log(this.hasMany(Transaction));
    // this.hasMany(Transaction)
    //   .query()
    //   .where('user_id', 1)
    //   .sum('amount')
    //   .then(([sum]) => console.log(Object.values(sum)[0]));
    return this.hasMany(Transaction);
  },
});

module.exports = { User, Transaction };
