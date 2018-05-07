"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex, smsFunctions)=>{

  router.put("/", (req,res) => {
    const userName = req.body.userName;
    const phone_number = req.body.phone_number;
    const inputDishes = [];
    const dishIDs = [];
    const dishSmsInfo = [];


  knex('accounts').where("phone_number", phone_number).select('phone_number', 'id')
  .then((result) =>{
     // Checks if user exists
    if(!result.length){
      //  Executes if user doesn't exist
      knex('accounts')
      .insert({
        name: userName,
        phone_number: phone_number,
        isRestaurant: false
      }).returning('id')
       // adds the order to the orders table. returns the order id
      .then((account_id) => {
        knex('orders')
        .insert({
          created_at: new Date(),
          account_id: account_id[0],
          isComplete: false
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
            smsFunctions.smsRestaurant(userName, phone_number, inputDishes);
            smsFunctions.smsCustomer(false, phone_number)
            res.send();
          })
        })
      })

     } else {
      //  Executes if user exists
      knex('orders')
      .insert({
        created_at: new Date(),
        account_id: result[0].id,
        isComplete: false
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


          knex.select('dishes.dish_name', 'order_items.quantity').from('dishes')
          .join('order_items', 'order_items.dish_id', '=', 'dishes.id')
          .where('order_items.order_id', inputDishes[0].order_id)
          .then((result) => {
            smsFunctions.smsRestaurant(userName, phone_number, result, inputDishes[0].order_id);
            smsFunctions.smsCustomer(false, phone_number);
          })
          // knex('dishes').whereIn('dishes.id', dishIDs).select('dishes.dish_name')
          // .then((result) => {
          //   console.log(result);
          //   // result.forEach((element, index) => {
          //   //   dishSmsInfo.push({name:element.dish_name, inputDishes[index].quantity})
          //   // })
          //   // smsFunctions.smsRestaurant(userName, phone_number, inputDishes);
          //   // smsFunctions.smsCustomer(false, phone_number);
          // res.send()
          // })
        })
       })
    }
  })
})
return router;

}
