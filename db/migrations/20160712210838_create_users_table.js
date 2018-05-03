exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('accounts', function (table) {
      table.increments('id');
      table.string('name');
      table.string('address');
      table.string('phone_number');
      table.string('email');
      table.boolean('isRestaurant');
    }),

    knex.schema.createTable('dishes', function (table) {
      table.increments('id');
      table.string('dish_name');
      table.string('price');
      table.string('description', 1000);
      table.integer('account_id');
    }),

    knex.schema.createTable('orders', function(table) {
      table.increments('id');
      table.timestamps();
      table.string('payment_method');
      table.integer('account_id');
    }),

    knex.schema.createTable('order_items', function(table) {
      table.increments('id');
      table.integer('quantity');
      table.integer('dish_id');
      table.integer('order_id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('order_details'),
    knex.schema.dropTable('orders'),
    knex.schema.dropTable('dishes'),
    knex.schema.dropTable('users')
  ])
};
