const express = require('express');
const router = express.Router();

let menuItems = [];

// Add or update menu item
router.post('/', (req, res) => {
  const { id, name, price, category } = req.body;

  if (!name || price <= 0 || !['appetizer', 'main', 'dessert'].includes(category)) {
    return res.status(400).json({ message: 'Invalid menu item data' });
  }

  const existingItemIndex = menuItems.findIndex(item => item.id === id);

  if (existingItemIndex > -1) {
    menuItems[existingItemIndex] = { id, name, price, category };
  } else {
    menuItems.push({ id, name, price, category });
  }

  res.status(200).json({ message: 'Menu item added/updated successfully' });
});

// Get all menu items
router.get('/', (req, res) => {
  res.status(200).json(menuItems);
});

module.exports = router;
