"use strict";
const twilioInfo = require("../apiData/twilioInfo.js")


module.exports = (twilioClient) => {
  return {
    smsRestaurant: () => {
                      twilioClient.messages.create({
                      body: "You have a new order",
                      to:"",
                      from: twilioInfo.twilioNumber
                      })
                      .then((message) => console.log(message.sid));
                    },

      smsCustomer: (isReady) => {
                      if(isReady){
                        twilioClient.messages.create({
                          body: "Your food is ready for pickup",
                          to:twilioInfo.personal_phone,
                          from: twilioInfo.twilioNumber
                          })
                          .then((message) => console.log(message.sid));
                      } else {
                        twilioClient.messages.create({
                          body: "Your order is received by the restauran.",
                          to:twilioInfo.personal_phone,
                          from: twilioInfo.twilioNumber
                          })
                          .then((message) => console.log(message.sid));
                      }
                    }
  }
}
