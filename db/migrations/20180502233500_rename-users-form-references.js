
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.renameTable('users', 'accounts'),

    knex.schema.table('dishes', function(table) {
      table.foreign('account_id').references('accounts.id');
    }),

    knex.schema.table('orders', function(table) {
      table.foreign('account_id').references('accounts.id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('orders', function(table) {
      table.dropForeign('account_id');
    }),

    knex.schema.table('dishes', function(table) {
      table.dropForeign('account_id');
    }),

    knex.schema.renameTable('accounts', 'users')
  ])
};
