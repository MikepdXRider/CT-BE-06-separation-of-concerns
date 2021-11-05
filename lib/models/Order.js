// This file is the model. 
// This is the last and first stop for any data traveling between our service/controller and our database. 
// These methods are only called elsewhere in the app, unless a method references it's own constructor. 

const pool = require('../utils/pool');

// static method: JSON.parse(), JSON.stringify(), Math.random()
// instance method: .toUpperCase(), .map/.reduce/.filter/.find/.some/.every
module.exports = class Order {
  id;
  quantity;

  constructor(row) {
    this.id = row.id;
    this.quantity = row.quantity;
  }

  static async insert(quantity) {
    const { rows } = await pool.query(
      'INSERT INTO orders (quantity) VALUES ($1) RETURNING *',
      [quantity]
    );

    return new Order(rows[0]);
  }

  // Declare a new static async method called getAll()
  static async getAll() {
  //  - destructure out of an awaits pool.query
    const { rows } = await pool.query(
    //    - SELECT * FROM orders
      'SELECT * FROM orders'
    );
    // console.log(rows);
    //  - return a mapping of the rows array from the SQL query. 
    //    - per each iteration of the map, return a new Order(currObj) with the current object. 
    return rows.map(currRow => new Order(currRow));
  }

  // Declare a new static async method called getById(id)
  static async getById(id) {
  //  - destructure out of an awaits pool.query
    const { rows } = await pool.query(
      //    - SELECT * FROM orders WHERE orders.id = $1, [id]
      'SELECT * FROM orders WHERE orders.id = $1', [id]
    );

    //  - return a new Order instance passing in the object returning from the sql query.
    return new Order(rows[0]);
  }

  // Declare a new static async method called update(id, quantity)
  static async update(id, quantity) {
  //  - destructure out of an awaits pool.query
    const { rows } = await pool.query(
      //    - UPDATE orders SET quantity = $1 * WHERE orders.id = $2 RETURNING *, [quantity, id]
      'UPDATE orders SET quantity = $1 WHERE orders.id = $2 RETURNING *', [quantity, id]
    );
    //  - return a new Order instance passing in the object returning from the sql query.
    return new Order(rows[0]);
  }


  // Declare a new static async method called DELETE(id)
  //  - destructure out of an awaits pool.query
  //    - Delete FROM orders WHERE orders.id = $1 RETURNING *, [id]
  //  - return a new Order instance passing in the object returning from the sql query.
};
