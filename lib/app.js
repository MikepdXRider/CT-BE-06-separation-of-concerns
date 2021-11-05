const express = require('express');
const app = express();

// enables us to use req.body to auto parse any incoming stringy json/text.
app.use(express.json());

// if (req.url === '/api/v1/orders/')
app.use('/api/v1/orders', require('./controllers/orders'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
