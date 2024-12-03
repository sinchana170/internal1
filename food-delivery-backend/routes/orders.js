const express = require('express');
const router = express.Router();

let orders = [];
let orderIdCounter = 1;
let menuItems = require('./menu').menuItems; // Import menuItems from menu.js

// Place a new order
router.post('/', (req, res) => {
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Invalid order data' });
  }

  const orderItems = items.map(itemId => menuItems.find(item => item.id === itemId));

  if (orderItems.includes(undefined)) {
    return res.status(400).json({ message: 'One or more items are invalid' });
  }

  const newOrder = {
    id: orderIdCounter++,
    items: orderItems,
    status: 'Preparing',
    createdAt: new Date(),
  };

  orders.push(newOrder);

  res.status(201).json(newOrder);
});

// Get order by ID
router.get('/:id', (req, res) => {
  const orderId = parseInt(req.params.id);

  const order = orders.find(order => order.id === orderId);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  res.status(200).json(order);
});

module.exports = router;
