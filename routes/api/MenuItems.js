const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Menu Item Model
const MenuItem = require('../../models/MenuItem');

// @route  GET api/MenuItems
// @desc   GET All Menu Items
// @access Public
router.get('/', (req, res) => {
  MenuItem.find()
    .sort({ date: -1 })
    .then(menuItems => res.json(menuItems))
});

// @route  POST api/MenuItems
// @desc   Create A Menu Item
// @access Private
router.post('/', auth, (req, res) => {
  const newMenuItem = new MenuItem({
    name: req.body.name,
    foodType: req.body.foodType
  });

  newMenuItem.save()
    .then(menuItem => res.json(menuItem));
});

// @route  DELETE api/MenuItems
// @desc   Delete A Menu Item
// @access Private
router.delete('/:id', auth, (req, res) => {
  MenuItem.findById(req.params.id)
    .then(menuItem => 
      menuItem.remove()
      .then(() =>
       res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;