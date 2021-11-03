# Separation of Concerns

Finish the order tracking application from class.

## Requirements

Create the remaining CRUD routes for the order model. Use the red, green,
refactor process.

You will need to add the `GET`, `PATCH`, & `DELETE` routes.

When an order is updated send a text message notifying the order
handler that an order was updated.

When an order is deleted send a text message notifying the order
handler that an order was deleted

## Rubric **10pts**

* `Order` model class *3pt*:
  * Unit tests for all `Order` methods in `__tests__/Order.test.js`
  * `Order.getAll()`
    * Returns an array of `Order` instances
  * `Order.getById(id)`
    * Returns an `Order`
  * `Order.update(id, quantity)`
    * Returns the updated `Order`
  * `Order.delete(id)`
    * Returns the deleted `Order`
* `OrderService` class *4pt*:
  * Unit tests for all `OrderService` methods in `__tests__/OrderService.test.js`
  * `OrderService.update(id, quantity)`
    * Updates the order in the database
    * Sends an "order updated" text message with the order ID and new quantity
  * `OrderService.delete(id)`
    * Deletes the order from the database
    * Sends an "order deleted" text message with the order ID
* `orders` controller *3pt*:
  * Unit tests for all `orders` routes in `__tests__/app.test.js`
  * `GET /api/v1/orders`
    * Responds with an array of all orders
  * `GET /api/v1/orders/:id`
    * Responds with an order object with the given id
  * `PATCH /api/v1/orders/:id`
    * Takes a request body with a JSON object `{ "quantity": /* some number */}` and updates the order with the given id
  * `DELETE /api/v1/orders/:id`
    * Deletes the order with the given id, then sends an empty response with the status code of `204`.
