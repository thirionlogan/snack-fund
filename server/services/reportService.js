const { getUsers } = require('./userService');
const xlsx = require('node-xlsx').default;

const options = {};

const getReport = () => {
  return getUsers()
    .then((users) =>
      users.map((user) => [user.rank, user.name, user.balance / 100])
    )
    .then((userRows) => [['Rank', 'Name', 'Balance']].concat(userRows))
    .then((data) =>
      xlsx.build(
        [
          {
            name: new Date().toISOString().slice(0, 10),
            data: data,
          },
        ],
        options
      )
    );
};

module.exports = { getReport };
