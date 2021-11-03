# Separation of Concerns Exercises

## Exercise 1

We have an order tracking application. Right now most of the
functionality happens in a single file, `lib/app.js`. In that file
five things happen:

1. we setup express
2. we setup a twilio client
3. we handle an incoming HTTP request and send an HTTP response
4. we store the order in our database
5. we send a text message to notify us that a new order has come in

Let's refactor to use a layer architecture with a model, controller,
service, and utils.

1. the express setup will remain in `lib/app.js`
2. our twilio client will move to `lib/utils/twilio.js`
3. our HTTP handling will move into a controller in
  `lib/controllers/orders.js`
4. communication with our database will move into a model in
  `lib/models/Order.js`
5. creating a new order (sending a text and inserting a row) will
  move into a service in `lib/services/OrderService.js`
