
exports.up = function(knex, Promise) {
  return knex.schema.renameTable('order_details', 'order_items');
};

exports.down = function(knex, Promise) {
  return knex.schema.renameTable('order_items', 'order_details');
};
