const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  submenus: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Submenu' }]
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
