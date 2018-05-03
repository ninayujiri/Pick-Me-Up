exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('order_items').truncate()
    .then(function () {
      return Promise.all([
        knex('order_items')
        .insert([
          {quantity: 1, dish_id: 1, order_id: 1},
          {quantity: 5, dish_id: 3, order_id: 1},
          {quantity: 2, dish_id: 2, order_id: 1},
          {quantity: 10, dish_id: 1, order_id: 2},
          {quantity: 50, dish_id: 3, order_id: 2},
          {quantity: 20, dish_id: 2, order_id: 2},
          {quantity: 100, dish_id: 1, order_id: 3},
          {quantity: 500, dish_id: 3, order_id: 3},
          {quantity: 200, dish_id: 2, order_id: 3},
        ])
      ]);
    });
};
