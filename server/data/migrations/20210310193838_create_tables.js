exports.up = (knex) =>
  knex.schema
    .createTable('user', (table) => {
      table.increments();
      table.string('rank').notNullable();
      table.string('name').notNullable();
      table.timestamps(true, true);
    })
    .createTable('transactions', (table) => {
      table.increments();
      table.integer('amount');
      table.integer('user_id').references('user.id').onDelete('CASCADE');
      table.timestamps(true, true);
    });

exports.down = (knex) =>
  knex.schema.dropTableIfExists('transactions').dropTableIfExists('user');
