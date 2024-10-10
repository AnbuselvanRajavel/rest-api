const express = require('express');
const router = express.Router();
const Submenu = require('../models/submenu.model');
const Menu = require('../models/menu.model');

// Create a submenu for a specific menu
router.post('/', async (req, res) => {
  try {
    const submenu = new Submenu(req.body);
    await submenu.save();

    // Add the submenu to the menu's submenus array
    const menu = await Menu.findById(submenu.menuId);
    menu.submenus.push(submenu._id);
    await menu.save();

    res.status(201).json(submenu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all submenus
router.get('/', async (req, res) => {
  try {
    const submenus = await Submenu.find();
    res.json(submenus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a submenu by ID
router.get('/:id', async (req, res) => {
  try {
    const submenu = await Submenu.findById(req.params.id);
    if (!submenu) return res.status(404).json({ error: 'Submenu not found' });
    res.json(submenu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a submenu by ID
router.put('/:id', async (req, res) => {
  try {
    const submenu = await Submenu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!submenu) return res.status(404).json({ error: 'Submenu not found' });
    res.json(submenu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a submenu by ID
router.delete('/:id', async (req, res) => {
  try {
    const submenu = await Submenu.findByIdAndDelete(req.params.id);
    if (!submenu) return res.status(404).json({ error: 'Submenu not found' });

    // Remove the submenu from its parent menu
    await Menu.findByIdAndUpdate(submenu.menuId, { $pull: { submenus: submenu._id } });

    res.json({ message: 'Submenu deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
