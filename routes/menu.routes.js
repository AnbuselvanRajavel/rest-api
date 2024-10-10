const express = require('express');
const router = express.Router();
const Menu = require('../models/menu.model');

// Create a new menu
router.post('/', async (req, res) => {
  try {
    const menu = new Menu(req.body);
    await menu.save();
    res.status(201).json(menu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all menus
router.get('/', async (req, res) => {
  try {
    const menus = await Menu.find().populate('submenus');
    res.json(menus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a menu by ID
router.get('/:id', async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id).populate('submenus');
    if (!menu) return res.status(404).json({ error: 'Menu not found' });
    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a menu by ID
router.put('/:id', async (req, res) => {
  try {
    const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!menu) return res.status(404).json({ error: 'Menu not found' });
    res.json(menu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a menu by ID
router.delete('/:id', async (req, res) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);
    if (!menu) return res.status(404).json({ error: 'Menu not found' });
    res.json({ message: 'Menu deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
