"use strict";

const express = require('express');
const router  = express.Router();
const twilioInfo = require("../apiData/twilioInfo.js")

module.exports = (twilio, smsFunctions) => {
  const MessagingResponse = twilio.twiml.MessagingResponse;

  router.post("/", (req,res) => {

    const responseSMS = req.body.Body;
    smsFunctions.smsCustomer(false, twilioInfo.personal_phone, responseSMS);
    // const twiml = new MessagingResponse();

    // twiml.message("Your msesage is received")
    // res.writeHead(200, {'Content-Type': 'text/xml'});
    // res.end(twiml.toString());
  });
 return router;
}
