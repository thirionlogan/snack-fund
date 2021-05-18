const { getUsers } = require('./userService');
const xlsx = require('xlsx');
const moment = require('moment');

const options = { type: 'buffer', cellDates: true };

const getReport = (startDate, endDate) => {
  return getUsers(false)
    .then((users) => ({
      Props: {
        Title: 'snackfundReport' + new Date().toISOString().slice(0, 10),
        Author: 'Logan Thirion',
        Manager: 'Michael Shaw',
        Company: 'Conjure',
        CreatedDate: new Date(),
      },
      SheetNames: ['Balances', 'Transactions'],
      '!ref': 'C2:C',
      Sheets: {
        Balances: xlsx.utils.aoa_to_sheet(
          [
            [
              '',
              'Total',
              {
                v: (users.reduce((x, y) => x + y.balance, 0) / 100).toFixed(2),
                t: 'n',
                z: '$#,##0.00',
              },
            ],
            ['Rank', 'Name', 'Balance'],
          ].concat(
            users.map((user) => [
              { v: user.rank, t: 's' },
              { v: user.name, t: 's' },
              {
                v: (user.balance / 100).toFixed(2),
                t: 'n',
                z: '$#,##0.00',
              },
            ])
          ),
          { cellDates: true }
        ),
        Transactions: xlsx.utils.aoa_to_sheet(
          [['Rank', 'Name', 'Amount', 'Date']].concat(
            users
              .filter((user) => user.transactions.length > 0)
              .map((user) =>
                user.transactions
                  // eslint-disable-next-line camelcase
                  .filter(({ created_at }) =>
                    moment(created_at).isBetween(startDate, endDate)
                  )
                  .map((transaction) => [
                    { v: user.rank, t: 's' },
                    { v: user.name, t: 's' },
                    {
                      v: (transaction.amount / 100).toFixed(2),
                      t: 'n',
                      z: '$#,##0.00',
                    },
                    { v: transaction.created_at, t: 'd', z: 'm/dd/yy' },
                  ])
              )
              .flat()
          ),
          { cellDates: true }
        ),
      },
    }))
    .then((workBook) => xlsx.write(workBook, options));
};

module.exports = { getReport };
