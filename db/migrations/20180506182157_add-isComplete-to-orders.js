
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('dishes',  (table) => {
      table.dropColumn('image_urls');
    }),

    knex.schema.table('orders', (table) => {
      table.boolean('isComplete');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('dishes', (table) => {
      table.string('image_urls');
    }),
    knex.schema.table('orders', (table) => {
      table.dropColumn('isComplete');
    })
  ])
};
