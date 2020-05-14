// Route to register a new user
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// Logged In User Model
const LoggedInUser = require('../../models/LoggedInUser');

// @route  POST api/LoggedInUsers
// @desc   Register new User
// @access Public
router.post('/', (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Simple Validation
  if(!firstName || !lastName || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check our DB for existing user
  LoggedInUser.findOne({ email })
    .then(user => {
      if(user) return res.status(400).json({ msg: 'User already exists' });

      const newUser = new LoggedInUser({
        firstName,
        lastName, 
        email,
        password
      });

      // Create salt & hash
      bcrypt.genSalt(10, (err, salt) =>{
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;

          newUser.password = hash;
          newUser.save()
            .then(user => {
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
      })
    })
});


module.exports = router;