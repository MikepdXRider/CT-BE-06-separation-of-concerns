// 🎉 Special shoutout to Dylan for offering this solution to the mocking confusion. 
const twilioUtils = require('../lib/utils/twilio.js');
twilioUtils.sendSms = jest.fn();

const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const Order = require('../lib/models/Order.js');
const OrderService = require('../lib/services/OrderService.js');

// This doesn't make any sense to me... How do I use this in the tests?
// jest.mock('twilio', () => () => ({
//   messages: {
//     create: jest.fn()
//   }
// }));

describe('tests OrderService Class methods/service', () => {
  beforeEach(() => {
    twilioUtils.sendSms.mockClear();
    return setup(pool);
  });

  it('Updates the order in the database and sends an update SMS', async() => {
    // declare a variable to store Order.insert(newOrderObj.quantity)
    const insertResponse = await Order.insert(7);

    // call OrderService.update() passing a new quantity and the insertResponse.id as an arguement
    await OrderService.update(insertResponse.id, 10);

    // declare a variable to store Order.getById(insertResponse.id);
    const getByIdResponse = await Order.getById(insertResponse.id);

    // expect getByIdResponse toEqual an object with the new quantity and insertResponse.id property values. 
    expect(getByIdResponse).toEqual({ id: insertResponse.id, quantity: 10 });

    // expect our mocked sendSms method to be called once for this test.
    expect(twilioUtils.sendSms).toHaveBeenCalledTimes(1);
  });

  it('Deletes the order from the database and sends a delete SMS', async() => {
    // declare a variable to store Order.insert(newOrderObj.quantity)
    const insertResponse = await Order.insert(7);

    // call OrderService.deleteOrder() passing a new quantity and the insertResponse.id as an arguement
    const deleteResponse = await OrderService.delete(insertResponse.id);

    // expect deleteResponse toEqual an object with expected quantity and id property values. 
    expect(deleteResponse).toEqual({ id: insertResponse.id, quantity: 7 });

    // expect our mocked sendSms method to be called once for this test.
    expect(twilioUtils.sendSms).toHaveBeenCalledTimes(1);
  });
});

