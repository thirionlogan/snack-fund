exports.up = (knex) =>
  knex.schema.table('user', (table) => {
    table.boolean('active').defaultTo(true);
  });

exports.down = (knex) =>
  knex.schema.table('user', (table) => {
    table.dropColumn('active');
  });
