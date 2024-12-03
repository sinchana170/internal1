const express = require('express');
const bodyParser = require('body-parser');
const menuRoutes = require('./routes/menu');
const ordersRoutes = require('./routes/orders');
const { updateOrderStatuses } = require('./utils/statusUpdater');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/menu', menuRoutes);
app.use('/orders', ordersRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Start the cron job for updating order statuses
updateOrderStatuses();
