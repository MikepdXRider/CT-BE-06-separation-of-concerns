const pool = require('../lib/utils/pool');
// const twilio = require('twilio');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
// import in orders

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn()
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

  it('returns an array of Order instances', () => {
    // declare two-three new order objects. 

    // declare an array consisting of the new order objects. 

    //  map the new object orders calling Order.insert(currNewOrderObj);

    // declare a variable to store a Order.getAll() call.

    // expect the get response to be an array containing one of the new order objects.
  });

  it('Returns an Order', () => {
    // declare a variable to store a new order object.

    // declare a variable to store a Order.insert(newOrderObj) call.

    // declare a variable to store a Order.getById(insertVar.id) call.

    // expect the get response to be an object matching the new order object.
  });

  it('Returns the updated Order', () => {
    // declare a variable to store a new order object.

    // declare a variable to store a Order.insert(newOrderObj) call.

    // declare a variable to store a Order.update(insertVar.id, newQuantity) call.

    // declare a variable to store a Order.getById(insertVar.id) call.

    // expect the get response quantity to match the newQuantity.
  });

  it('Returns the deleted Order', () => {
    // declare a variable to store a new order object.

    // declare a variable to store a Order.insert(newOrderObj) call.

    // declare a variable to store a Order.delete(insertVar.id) call.

    // expect the delete response to match the newOrderObj.
  });
});
