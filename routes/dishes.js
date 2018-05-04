"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

router.get("/", (req, res) => {
    knex
      .select('*')
      .from('dishes')
      .then((results) => {
        res.render("dishes", { dishes:results });
      })
    });

  return router;
}
