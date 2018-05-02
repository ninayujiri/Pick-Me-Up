exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function (table) {
      table.increments('id');
      table.string('name');
      table.string('address');
      table.integer('phone_number');
      table.string('email');
      table.boolean('isRestaurant');
    }),

    knex.schema.createTable('restaurants', function (table) {
      table.increments('id');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
    }),

    knex.schema.createTable('dishes', function (table) {
      table.increments('id');
      table.string('dish_name');
      table.string('price');
      table.string('description', 1000);
      table.integer('restaurant_id').unsigned();
      table.foreign('restaurant_id').references('users.id');
    }),

    knex.schema.createTable('orders', function(table) {
      table.increments('id');
      table.timestamps();
      table.string('payment_method');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
    }),

    knex.schema.createTable('order_details', function(table) {
      table.increments('id');
      table.integer('quantity');
      table.integer('dish_id').unsigned();
      table.foreign('dish_id').references('dishes.id');
      table.integer('order_id').unsigned();
      table.foreign('order_id').references('orders.id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('order_details'),
    knex.schema.dropTable('orders'),
    knex.schema.dropTable('dishes'),
    knex.schema.dropTable('restaurants'),
    knex.schema.dropTable('users')
  ])
};
