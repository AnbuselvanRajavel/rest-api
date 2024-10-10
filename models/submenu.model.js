const mongoose = require('mongoose');

const submenuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  menuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true }
});

const Submenu = mongoose.model('Submenu', submenuSchema);

module.exports = Submenu;
