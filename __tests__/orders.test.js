// Unit tests for all orders routes in __tests__/app.test.js
//  - GET /api/v1/orders
//      - Responds with an array of all orders
//  - GET /api/v1/orders/:id
//      - Responds with an order object with the given id
//  - PATCH /api/v1/orders/:id
//      - Takes a request body with a JSON object { "quantity": /* some number */} and updates the order with the given id
//  - DELETE /api/v1/orders/:id
//      - Deletes the order with the given id, then sends an empty response with the status code of 204.


const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');



// This doesn't make any sense to me... How do I use this in the tests?
jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn()
  }
}));

const Order = require('../lib/models/Order.js');
const OrderService = require('../lib/services/OrderService.js');

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
});

