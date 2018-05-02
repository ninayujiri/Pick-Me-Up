
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('orders', function(table) {
      table.dropForeign('user_id');
      table.renameColumn('user_id', 'account_id');
    }),

    knex.schema.table('dishes', function(table) {
      table.dropForeign('restaurant_id');
      table.renameColumn('restaurant_id', 'account_id');
    }),
  ])
};




exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('orders', function(table) {
      table.renameColumn('account_id', 'user_id');
      table.foreign('user_id').references('users.id');
    }),

    knex.schema.table('dishes', function(table) {
      table.renameColumn('account_id', 'restaurant_id');
      table.foreign('restaurant_id').references('restaurants.id');
    })
  ])
};
