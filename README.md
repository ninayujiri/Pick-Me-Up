# Pick Me Up Food Ordering App

A web application built with Node, Express, AJAX, Twilio API, jQuery, HTML5, SASS, Bootstrap and Knex.js and PosgreSQL.


## Problem Statement

An app to simplify the food ordering experience. It allows the customer to place an order online and recieve a text message when the order is ready to be picked up.


## Final Product

!["Screenshot of Home Page"](https://github.com/kaanyalti/midterm/blob/master/docs/home.jpg?raw=true)
!["GIF of Cart Page and Confirmation"](https://github.com/kaanyalti/midterm/blob/master/docs/cart.gif?raw=true)
!["Screenshot of Orders Page(for Restaurant)"](https://github.com/kaanyalti/midterm/blob/master/docs/orders.jpg?raw=true)


## Getting Started

Install all dependencies (using `npm install`)

Setup the database:
- Run `knex migrate:latest` in the terminal
- Set up seed data using  `knex seed:run`

To use Twilio features:
1. Install ngrok: https://dashboard.ngrok.com/get-started
2. Set up a connection with local host 8080 and copy the URL of your tunnel
3. Sign up for an account with Twilio
4. Get a Twilio phone number
5. Set the request URL to your tunneled address
6. Create a module that's linked to server.js and set the variables with your ngrok info. Set `twilioID , twilioToken, twilioNumber, and test_number`

Run the development web server using `npm start`

Visit http://localhost:8080/


## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
- Express 4.16.3 or above
- Body Parser 1.15.2 or above
- Nodemon 1.9.2 or above
- Twilio 3.16.0 or above
- Node Sass 0.9.8 or above
- Knex 0.11.7 or above
