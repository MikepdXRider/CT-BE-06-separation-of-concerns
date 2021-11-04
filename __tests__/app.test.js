const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Order = require('../lib/models/Order.js');
const { insert } = require('../lib/models/Order.js');
// import in orders

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

  it('returns an array of Order instances', async() => {
    // declare two-three new order objects. 
    const firstNewObj = {
      quantity: 10
    };
    const secondNewObj = {
      quantity: 11
    };

    // declare an array consisting of the new order objects. 
    const newObjArr = [firstNewObj, secondNewObj];

    //  map the new object orders calling Order.insert(currNewOrderObj);
    await newObjArr.map(async currObj => await Order.insert(currObj.quantity));

    // declare a variable to store a Order.getAll() call.
    const getAllResponse = await Order.getAll();

    // expect the get response to be an array containing one of the new order objects.
    expect(getAllResponse).toEqual(expect.arrayContaining([{ ...firstNewObj, id: expect.any(String) }]));
  });

  it('Returns an Order', async() => {
    // declare a variable to store a new order object.
    const newObj = {
      quantity: 110
    };

    // declare a variable to store a Order.insert(newOrderObj) call.
    const insertResponse = await Order.insert(newObj.quantity);
    // declare a variable to store a Order.getById(insertVar.id) call.
    const getByIdResponse = await Order.getById(insertResponse.id);
    // expect the get response to be an object matching the new order object.
    expect(getByIdResponse).toEqual({ ...newObj, id: expect.any(String) });
  });

  it('Returns the updated Order', async () => {
    // declare a variable to store a new order object.
    const newObj = {
      quantity: 110
    };
    // declare a variable to store a Order.insert(newOrderObj) call.
    const insertResponse = await Order.insert(newObj.quantity);
    // declare a variable to store a Order.update(insertVar.id, newQuantity) call.
    await Order.update(insertResponse.id, 120);
    // declare a variable to store a Order.getById(insertVar.id) call.
    const getByIdResponse = await Order.getById(insertResponse);
    // expect the get response quantity to match the newQuantity.
    expect(getByIdResponse).toEqual({ id: insertResponse.id, quantity: 120 });
  });

  // it('Returns the deleted Order', () => {
  //   // declare a variable to store a new order object.

  //   // declare a variable to store a Order.insert(newOrderObj) call.

  //   // declare a variable to store a Order.delete(insertVar.id) call.

  //   // expect the delete response to match the newOrderObj.
  // });


});
