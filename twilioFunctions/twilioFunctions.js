"use strict";
const twilioInfo = require("../apiData/twilioInfo.js")


module.exports = (twilioClient) => {
  return {
    smsRestaurant: () => {
                      twilioClient.messages.create({
                      body: "You have a new order",
                      to:twilioInfo.personal_phone,
                      from: twilioInfo.twilioNumber
                      })
                      .then((message) => console.log(message.sid));
                    },

      smsCustomer: (isReady, clientPhone, message) => {
                    if(!isReady && message){
                      twilioClient.messages.create({
                        body: message,
                        to:clientPhone,
                        from: twilioInfo.twilioNumber
                        })
                        .then((message) => console.log(message.sid));
                    } else if (!isReady){
                      twilioClient.messages.create({
                        body: "Your order is received by the restaurant.",
                        to:clientPhone,
                        from: twilioInfo.twilioNumber
                        })
                        .then((message) => console.log(message.sid));
                    } else {
                      twilioClient.messages.create({
                        body: "Your food is ready for pickup",
                        to:clientPhone,
                        from: twilioInfo.twilioNumber
                        })
                        .then((message) => console.log(message.sid));
                    }

    }
  }
}
