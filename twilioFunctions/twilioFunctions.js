"use strict";
const twilioInfo = require("../apiData/twilioInfo.js")


module.exports = (twilioClient) => {
  return {
    smsRestaurant: (userName, phone_number, dishes) => {
                      console.log(dishes)
                      let dishMessage = ''
                      let message = ''

                      dishes.forEach((element) =>{
                        console.log(element);
                        dishMessage += `${element.dish_name}: ${element.quantity}`
                      });

                      message +=`Customer Name: ${userName} phone number: ${phone_number}  dishes: ${dishMessage}`;

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

    }
  }
}
