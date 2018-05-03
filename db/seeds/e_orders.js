
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('orders').truncate()
    .then(function () {
      return Promise.all([
        knex('orders')
        .insert([
          {created_at: new Date(), payment_method: 'credit_card', account_id: 2},
          {created_at: new Date(), payment_method: 'cash', account_id: 3},
          {created_at: new Date(), payment_method: 'credit_card', account_id: 4}
        ])
      ]);
    });
};
