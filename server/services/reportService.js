const { getUsers } = require('./userService');
const xlsx = require('node-xlsx').default;

const options = {};

const getReport = () => {
  return getUsers()
    .then((users) => [
      {
        name: 'Balances',
        data: [['Rank', 'Name', 'Balance']].concat(
          users.map((user) => [user.rank, user.name, user.balance / 100])
        ),
      },
      {
        name: 'Transactions',
        data: [['Rank', 'Name', 'Amount', 'Date']].concat(
          users
            .filter((user) => user.transactions.length > 0)
            .map((user) =>
              user.transactions.map((transaction) => [
                user.rank,
                user.name,
                transaction.amount / 100,
                transaction.created_at.toISOString(),
              ])
            )
            .flat()
        ),
      },
    ])
    .then((data) => xlsx.build(data, options));
};

module.exports = { getReport };
