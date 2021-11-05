const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
// import in orders
const Order = require('../lib/models/Order.js');

// This doesn't make any sense to me....
jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn()
    // Am I supposed to add a new property and jest.fn() per each message type? What is messages.create event referencing? 
  }
}));

describe('tests Order/Model methods', () => {
  beforeEach(() => {
    return setup(pool);
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

  it('Returns the updated Order', async() => {
    // declare a variable to store a new order object.
    const newObj = {
      quantity: 110
    };
    // declare a variable to store a Order.insert(newOrderObj) call.
    const insertResponse = await Order.insert(newObj.quantity);
    // declare a variable to store a Order.update(insertVar.id, newQuantity) call.
    // console.log('insertResponse Id before updating :', insertResponse);
    await Order.update(insertResponse.id, 120);
    // declare a variable to store a Order.getById(insertVar.id) call.
    const getByIdResponse = await Order.getById(insertResponse.id);
    // expect the get response quantity to match the newQuantity.
    expect(getByIdResponse).toEqual({ id: insertResponse.id, quantity: 120 });
  });

  it('Returns the deleted Order', async() => {
    // declare a variable to store a new order object.
    const newObj = {
      quantity: 25
    };
    // declare a variable to store a Order.insert(newOrderObj) call.
    const insertResponse = await Order.insert(newObj.quantity);
    // declare a variable to store a Order.delete(insertVar.id) call.
    const deleteResponse = await Order.delete(insertResponse.id);
    // expect the delete response to match the newOrderObj.
    expect(deleteResponse).toEqual({ ...newObj, id: expect.any(String) });
  });


});

