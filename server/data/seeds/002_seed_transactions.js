exports.seed = (knex) =>
  knex('transaction')
    .del()
    .then(() =>
      knex('transaction').insert([
        { user_id: 1, amount: 1000 },
        { user_id: 2, amount: 2000 },
        { user_id: 3, amount: 500 },
        { user_id: 4, amount: -100 },
        { user_id: 5, amount: 2500 },
        { user_id: 6, amount: -325 },
      ])
    );
