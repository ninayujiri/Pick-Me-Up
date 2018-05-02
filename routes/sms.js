"use strict";


twilioClient.messages.create({
  body: "HOWS IT GOING BRUH??????????",
  to:"this is a placeholder",
  from: tokens.twilioNumber
}).then((message) => console.log(message.sid));
