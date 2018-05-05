"use strict";

const express = require('express');
const router  = express.Router();


module.exports = (knex) => {

//  Retrieves restaurant data when the page loads for the first time
  router.get("/", (req,res) => {
    knex.select('id', 'name', 'address', 'phone_number', 'email')
        .from('accounts')
        .then((result) => res.json(result));
  });

//  Add a new dish returns the dish_id to front end
  router.post("/dishes", (req,res) => {
    const dishName  = req.body.dishName;
    const dishDesc  = req.body.dishDescription;
    const dishPrice = req.body.dishPrice;
    const accountID = req.body.accountID;

    knex('dishes')
      .insert({
        dish_name   : dishName,
        description : dishDesc,
        price       : dishPrice,
        account_id  : accountID
      })
      .returning('id')
      .then(id=>{res.status(200).json(id)});
  });

//  Edits an individual dish
  router.put("/dishes/:id/edit", (req,res) => {
    const dishID    = req.params.id;
    const dishName  = req.body.dishName;
    const dishDesc  = req.body.dishDescription;
    const dishPrice = req.body.dishPrice;
    const accountID = req.body.accountID;

    knex('dishes')
      .where({id: dishID})
      .update({
        dish_name   : dishName,
        description : dishDesc,
        price       : dishPrice,
      })
      .then(res.status(200).send());
  });

//  Deletes an individual dish
  router.delete("/dishes/:id/delete", (req,res) => {
    const dishID = req.params.id;
    knex('order_items')
      .where('dish_id', dishID)
      .del()
      .then(() => {
        knex('dishes')
          .where('id', disID)
          .del()
          .then(res.status(200).send());
      });
  });

  router.get("/:restaurantID/orders", (req,res) => {
    res.render("../views/orders.ejs");
  });


//  Renders the orders table for the restaurant owner
  router.get("/:restaurantID/orders/fetch", (req,res) => {
    const restaurantID = req.params.restaurantID;
    const outputData = {};

    knex.select('orders.id', 'order_items.quantity', 'dishes.dish_name', 'orders.created_at', 'accounts.name', 'accounts.phone_number', 'orders.payment_method')
    .from('order_items')
    .join('orders', 'order_items.order_id','=','orders.id')
    .join('accounts', 'orders.account_id','=', 'accounts.id')
    .join('dishes', 'order_items.dish_id','=','dishes.id')
    .where('dishes.account_id', restaurantID)
    .then((result) => {
      let outputData = {};

      result.forEach((element) => {
        if(!outputData[element.id]){
          outputData[element.id] = {};
          outputData[element.id].name = element.name;
          outputData[element.id].id = element.id;
          outputData[element.id].phone_number = element.phone_number;
          outputData[element.id].created_at = element.created_at;
        } else {
          outputData[element.id].name = element.name;
          outputData[element.id].id = element.id;
          outputData[element.id].phone_number = element.phone_number;
          outputData[element.id].created_at = element.created_at;
        }
      });

      console.log(outputData);

      res.status(200).json(outputData);
    });
  });







// Order Details

  router.get("/:restaurantID/orders/:orderID", (req,res) => {
    res.render("../views/orders_id.ejs");
  });


//  Renders the order details table
  router.get("/:restaurantID/orders/:orderID/fetch", (req,res) => {
    const orderID = req.params.orderID;
    const detailsData = {};

    knex.select('orders.id', 'order_items.quantity', 'dishes.dish_name', 'orders.created_at', 'accounts.name', 'accounts.phone_number', 'orders.payment_method')
    .from('order_items')
    .join('orders', 'order_items.order_id','=','orders.id')
    .join('accounts', 'orders.account_id','=', 'accounts.id')
    .join('dishes', 'order_items.dish_id','=','dishes.id')
    .where('order_items.order_id', orderID)
    .then((result) => {
      let detailsData = {};

      result.forEach((element) => {
        if(!detailsData[element.name]){
          detailsData[element.name] = {};
          detailsData[element.name].dishes = [];
          detailsData[element.name].dishes.push({dish_name:element.dish_name, quantity: element.quantity});

        } else {
          detailsData[element.name].dishes.push({dish_name:element.dish_name, quantity: element.quantity});
        }
      });

      // console.log(detailsData);

      res.status(200).json(detailsData);
    });
  });

  return router;
}
