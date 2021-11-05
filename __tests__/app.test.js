const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

// This doesn't make any sense to me... How am I supposed to use this in the test?
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

  it('Responds with an array of orders', async() => {
    const firstNewObj = {
      quantity: 10
    };
    const secondNewObj = {
      quantity: 20
    };
    const newObjArr = [firstNewObj, secondNewObj];

    await Promise.all(
      newObjArr.map(async currObj => await request(app)
        .post('/api/v1/orders')
        .send(currObj)
      ));

    const getAllResponse = await request(app)
      .get('/api/v1/orders');


    expect(getAllResponse.body).toEqual(expect.arrayContaining([{ id: expect.any(String), quantity: expect.any(Number) }]));
  });

  it('Responds with an order object with the given id', async() => {
    const postResponse = await request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 });

    const getResponse = await request(app)
      .get(`/api/v1/orders/${postResponse.body.id}`);
      
    expect(getResponse.body).toEqual(postResponse.body);
  });

  it('Takes a request body with a JSON object { "quantity": /* some number */} and updates the order with the given id', async() => {
    const postResponse = await request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 });

    await request(app)
      .patch(`/api/v1/orders/${postResponse.body.id}`)
      .send({ quantity: 15 });  

    const getResponse = await request(app)
      .get(`/api/v1/orders/${postResponse.body.id}`);
      
    expect(getResponse.body).toEqual({ quantity: 15, id: postResponse.body.id });
  });

  // it('Deletes the order with the given id, then sends an empty response with the status code of 204', async() => {
  //   const postResponse = await request(app)
  //     .post('/api/v1/orders')
  //     .send({ quantity: 10 });

  //   const deleteResponse = await request(app)
  //     .delete(`/api/v1/orders/${postResponse.body.id}`)
  //     .send({ quantity: 15 });  

  //   expect(deleteResponse.body).toEqual('');
  //   expect(deleteResponse.statusCode).toEqual(204);
  // });
});


// Unit tests for all orders routes in __tests__/app.test.js

//  - DELETE /api/v1/orders/:id
//      - Deletes the order with the given id, then sends an empty response with the status code of 204.

