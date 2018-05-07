"use strict";
const twilioInfo = require("../apiData/twilioInfo.js")


module.exports = (twilioClient) => {
  return {
    smsRestaurant: (userName, phone_number, nameQuantity, orderID) => {
                      // console.log(dishes)
                      let dishMessage = ''
                      let message = ''

                      nameQuantity.forEach((element) =>{
                        dishMessage += `${element.dish_name}: ${element.quantity} \n`
                      });

                      message +=`Customer Name: ${userName} \n phone number: ${phone_number} \n order ID: ${orderID} \n order: \n ${dishMessage}`;

                      twilioClient.messages.create({
                      body: `You have a new order: \n ${message}`,
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
                    },

        smsRedirect: (outboundNumber, responseSms) => {
                      console.log(outboundNumber, responseSms)
                       twilioClient.messages.create({
                          body: responseSms,
                          to:outboundNumber,
                          from: twilioInfo.twilioNumber
                          })
                          .then((message) => console.log(message.sid));
                      }
  }
}

