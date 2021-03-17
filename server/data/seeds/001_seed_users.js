exports.seed = (knex) =>
  knex('user')
    .del()
    .then(() =>
      knex('user').insert([
        { rank: 'SrA', name: 'Thirion' },
        { rank: 'SrA', name: 'Shaw' },
        { rank: 'SSgt', name: 'Monroe' },
        { rank: 'TSgt', name: 'Drevon' },
        { rank: 'A1C', name: 'Wilson' },
        { rank: 'TSgt', name: 'Messler' },
      ])
    );
