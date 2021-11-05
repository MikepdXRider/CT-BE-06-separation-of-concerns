// This file is the service.
// The service exists between the controller and model, adding the unique flavor/logic of our application before handing responses/requests to the controller/model. 
// Anything our app does that is unique/outside the scope of the traditional controller/model framework exists here.
// For example: Our app sends text messages to alert the delivery/shipping service when a new order has been placed. This type of funcitonality/logic exists here. 

const Order = require('../models/Order');
const { sendSms } = require('../utils/twilio');

module.exports = class OrderService {
  static async createOrder(quantity) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New Order received for quantity: ${quantity}`
    );

    const order = await Order.insert(quantity);

    return order;
  }

  static async update(id, quantity) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order #${id} update to quantity: ${quantity}`
    );

    const order = await Order.update(id, quantity);

    return order;
  }

  static async delete(id) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order #${id} deleted`
    );

    const order = await Order.delete(id);

    return order;
  }

  static async getById(id) {
  // no need to make an SMS message for gets. 
    const order = await Order.getById(id);

    return order;
  }


  static async getAll() {
  // no need to make an SMS message for gets. 
    const order = await Order.getAll();

    return order;
  }
};
