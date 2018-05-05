"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex, smsFunctions)=>{

  router.put("/", (req,res) => {
    const userName = req.body.userName;
    const phone_number = req.body.phone_number;
    const inputDishes = [];

    knex
    //  adds the user to the accounts table. returns the user's id
    //  adding user can be factored out later
    knex('accounts')
    .insert({
      name: userName,
      phone_number: phone_number
    }).returning('id')

    //  adds the order to the orders table. returns the order id
    .then((account_id) => {
      knex('orders')
      .insert({
        created_at: new Date(),
        account_id: account_id[0]
      }).returning('id')

      //  adds the order items to the order_items table. sends sms if the procedure is successful
      .then((order_id) => {
        res.body.dishes.forEach((element) => {
          element.order_id = order_id;
          inputDises.push(element);
        });
        knex('order_items')
        .insert(inputDishes)
        .then(() => {
          smsFunctions.smsRestaurant();
          smsFunctions.smsCustomer(false)
        });
      })
    })

  });

  return router;
}
