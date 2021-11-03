const express = require('express');
const app = express();

// req.body === { quantity: 10 }
app.use(express.json());

// if (req.url === '/api/v1/orders/')
app.use('/api/v1/orders', require('./controllers/orders'));
// app.use('/api/v1/dogs', require('./controllers/dogs'));
// app.use('/api/v1/cars', require('./controllers/cars'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
