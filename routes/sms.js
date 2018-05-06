"use strict";

const express = require('express');
const router  = express.Router();
const twilioInfo = require("../apiData/twilioInfo.js")

module.exports = (twilio, smsFunctions) => {
  const MessagingResponse = twilio.twiml.MessagingResponse;

  router.post("/", (req,res) => {
    const responseSMS = req.body.Body;
    smsFunctions.smsCustomer(false, twilioInfo.personal_phone, responseSMS);
  });
 return router;
}
