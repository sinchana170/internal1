const cron = require('node-cron');

const orderStatusQueue = ['Preparing', 'Out for Delivery', 'Delivered'];

let orders = require('../routes/orders').orders; // Import the orders array

const updateOrderStatuses = () => {
  cron.schedule('*/5 * * * * *', () => { // Runs every 5 seconds for demo purposes
    orders.forEach(order => {
      if (order.status !== 'Delivered') {
        const currentStatusIndex = orderStatusQueue.indexOf(order.status);
        order.status = orderStatusQueue[currentStatusIndex + 1];
      }
    });
    console.log('Order statuses updated');
  });
};

module.exports = { updateOrderStatuses };
