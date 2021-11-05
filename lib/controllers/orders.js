// This file is the controller. 
// This is the first and last stop for any incomming requests/outgoing responses between our service/model and the client. 
// A minimal amount of munging and work is done here to simply determine where the request should go and how it should be handled. 


const { Router } = require('express');
const OrderService = require('../services/OrderService');

module.exports = Router()
  // if (req.method === 'POST' && req.url === '/api/v1/orders/')
  .post('/', async(req, res, next) => {
    try {
      // req.body === { quantity: 10 }
      const order = await OrderService.createOrder(req.body.quantity);
      // order === { id: '1', quantity: 10 }

      res.send(order);
    } catch(err) {
      next(err);
    }
  })
  .get('/:id', async(req, res, next) => {
    try {
      const { id } = req.params;

      const order = await OrderService.getById(id);
      res.send(order);
    } catch(err) {
      next(err);
    }
  })
  .get('/', async(req, res, next) => {
    try {
      const order = await OrderService.getAll();

      res.send(order);
    } catch(err) {
      next(err);
    }
  });
