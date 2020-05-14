const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const app = express();

// Body Parser Middleware
app.use(express.json());

// DB We are connecting to
const db = config.get('mongoURI');

mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/MenuItems', require('./routes/api/MenuItems'));
app.use('/api/LoggedInUsers', require('./routes/api/LoggedInUsers'));
app.use('/api/Auth', require('./routes/api/Auth'));


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));