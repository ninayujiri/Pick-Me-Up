"use strict";

const express = require('express');
const router  = express.Router();


module.exports = (knex) => {

  router.get("/", (req,res) => {
    knex.select('id', 'name', 'address', 'phone_number', 'email')
        .from('accounts')
        .then((results) => res.json(result));
  }),

  router.put("/dishes", (req,res) => {
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
    .then(res.status(200).send("OK"));
  })


}


/*
SELECT * FROM accounts
WHERE type = 'Restaurant'
*/
