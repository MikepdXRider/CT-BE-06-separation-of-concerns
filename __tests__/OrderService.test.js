const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Order = require('../lib/models/Order.js');
const OrderService = require('../lib/services/OrderService.js');
// import OrderService


// Unit tests for all OrderService methods in __tests__/OrderService.test.js
// - OrderService.update(id, quantity)
// Updates the order in the database
// Sends an "order updated" text message with the order ID and new quantity
// - OrderService.delete(id)
// Deletes the order from the database
// Sends an "order deleted" text message with the order ID


// This doesn't make any sense to me....
jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn()
    // Am I supposed to add a new property and jest.fn() per each message type? What is messages.create event referencing? 
  }
}));

describe('03_separation-of-concerns-demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new order in our database and sends a text message', () => {
    return request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 })
      .then(res => {
        // expect(createMessage).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
          id: '1',
          quantity: 10
        });
      });
  });

  it('Updates the order in the database', async() => {
    
    // declare a variable to store Order.insert(newOrderObj.quantity)
    const insertResponse = await Order.insert(7);

    // call OrderService.update() passing a new quantity and the insertResponse.id as an arguement
    await OrderService.update(insertResponse.id, 10);

    // declare a variable to store Order.getById(insertResponse.id);
    const getByIdResponse = await Order.getById(insertResponse.id);

    // expect getByIdResponse toEqual an object with the new quantity and insertResponse.id property values. 
    expect(getByIdResponse).toEqual({ id: insertResponse.id, quantity: 10 });
  });

  //   it('Sends an order updated text message with the order ID and new quantity', async() => {
  //     // declare a new order object variable.
    
  //     // declare a variable to store Order.insert(newOrderObj.quantity)

  //     // call OrderService.update() passing a new quantity and the insertResponse.id as an arguement

  //     // declare a variable to store Order.getById(insertResponse.id);

//     // expect(createMessage).toHaveBeenCalledTimes(1);
//   });
});

