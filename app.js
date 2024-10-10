const express = require('express');
const mongoose = require('mongoose');
const Menu = require('./models/menu.model');
const Submenu = require('./models/submenu.model');

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Import routes
const menuRoutes = require('./routes/menu.routes');
const submenuRoutes = require('./routes/submenu.routes');

// Routes
app.use('/api/menus', menuRoutes);
app.use('/api/submenus', submenuRoutes);

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://anbuselvan2310:yRIB12dWzVxqTXII@restapidb.0nxpv.mongodb.net/Rest-API-Workshop?retryWrites=true&w=majority&appName=restapidb"
  )
  .then(() => {
    console.log("Connected to the database!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });

module.exports = app;
