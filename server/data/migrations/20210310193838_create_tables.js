exports.up = (knex) => {
  return knex.schema
    .createTable('user', (table) => {
      table.increments();
      table.string('rank').notNullable();
      table.string('name').notNullable();
      table.timestamps(true, true);
    })
    .createTable('transaction', (table) => {
      table.increments();
      table.integer('amount');
      table.integer('user_id').references('user.id').onDelete('CASCADE');
      table.timestamps(true, true);
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('transaction').dropTableIfExists('user');
};
