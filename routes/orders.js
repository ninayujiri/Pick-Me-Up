"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex, smsFunctions)=>{

  router.put("/", (req,res) => {
    const userName = req.body.userName;
    const phone_number = req.body.phone_number;
    const inputDishes = [];


  knex('accounts').where("phone_number", phone_number).select('phone_number')
  .then((result) =>{

     // Checks if user exists
    if(!result.length){
      //  Executes if user doesn't exist

      knex('accounts')
      .insert({
        name: userName,
        phone_number: phone_number
      }).returning('id')
       // adds the order to the orders table. returns the order id
      .then((account_id) => {
        knex('orders')
        .insert({
          created_at: new Date(),
          account_id: account_id[0]
        }).returning('id')
          //  adds the order items to the order_items table. sends sms if the procedure is successful
        .then((order_id) => {
          req.body.dishes.forEach((element) => {
            element.order_id = order_id[0];
            inputDishes.push(element);
          });

          knex('order_items')
          .insert(inputDishes)
          .then(() => {
            smsFunctions.smsRestaurant();
            smsFunctions.smsCustomer(false, phone_number)
          }).finally(()=> knex.destroy());
        })
      })

     } else {
      //  Executes if user exists
      knex('orders')
      .insert({
        created_at: new Date(),
        account_id: result[0].id
      }).returning('id')
      //  adds the order items to the order_items table. sends sms if the procedure is successful
      .then((order_id) => {
        req.body.dishes.forEach((element) => {
          // console.log(element);
          element.order_id = order_id[0];
          inputDishes.push(element);
        });
        // console.log(inputDishes);
        knex('order_items')
        .insert(inputDishes)
        .then(() => {
          smsFunctions.smsRestaurant();
          smsFunctions.smsCustomer(false, phone_number);
          res.send()
        }).finally(()=> knex.destroy());
       })
    }

  })
})
return router;

}

