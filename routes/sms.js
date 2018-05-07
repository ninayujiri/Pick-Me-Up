"use strict";

const express = require('express');
const router  = express.Router();
const twilioInfo = require("../apiData/twilioInfo.js")

module.exports = (twilio, smsFunctions, knex) => {
  const MessagingResponse = twilio.twiml.MessagingResponse;

  router.post("/", (req,res) => {
    const orderID = req.body.Body.slice(0,1);
    const responseSMS = req.body.Body.slice(1);
    let outboundNumber = 0;
    knex.select('phone_number').from('accounts')
    .join('orders', 'orders.account_id', '=', 'accounts.id')
    .where('orders.id', orderID)
    .then((result) => {
      outboundNumber = result[0].phone_number
      smsFunctions.smsRedirect(outboundNumber, responseSMS);
    })
  });
 return router;
}
