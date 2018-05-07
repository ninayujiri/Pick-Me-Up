"use strict";

const express = require('express');
const router  = express.Router();
const twilioInfo = require("../apiData/twilioInfo.js")

module.exports = (twilio, smsFunctions) => {
  const MessagingResponse = twilio.twiml.MessagingResponse;

  router.post("/", (req,res) => {
    console.log(req.body);
    const outboundNumber = req.body.Body.slice(0,12);
    const responseSMS = req.body.Body.slice(12);
    smsFunctions.smsCustomer(false, incomingNumber, responseSMS);
  });
 return router;
}
