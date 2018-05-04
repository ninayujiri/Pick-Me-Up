
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('dishes', function(table){
      table.string('image_urls');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('dishes', function(table){
      table.dropColumn('image_urls');
    })
  ])
};
