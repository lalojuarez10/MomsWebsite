// Route to validate a user when logging in
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// Logged In User Model
const LoggedInUser = require('../../models/LoggedInUser');

// @route  POST api/Auth
// @desc   Authenticate a User
// @access Public
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // Simple Validation
  if(!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check our DB for existing user
  LoggedInUser.findOne({ email })
    .then(user => {
      if(!user) return res.status(400).json({ msg: 'User does not exist' });

      console.log(password);

      // Validate password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials'});

          jwt.sign(
            { id: user.id },               // 1st param: payload: whatever you want, here we want user id
            config.get('jwtSecret'),
            { expiresIn: 3600},            // token expires in hour
            (err, token) => {
              if(err) throw err;
              
              res.json({
                token: token,
                user: {
                  id: user.id,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email
                }
              })
            }
          )
        })
    })
});

// @route  GET api/Auth/LoggedInUser
// @desc   Get a User data
// @access Private
router.get('/LoggedInUser', auth, (req, res) => {
  LoggedInUser.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
})

module.exports = router;