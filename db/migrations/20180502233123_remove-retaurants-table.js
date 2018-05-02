
exports.up = function(knex, Promise) {
  return knex.schema.dropTable('restaurants');
};

exports.down = function(knex, Promise) {
  return knex.schema.createTable('restaurants', function (table) {
    table.increments('id');
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('users.id');
  })
};
