const express = require('express');
const bodyParser = require('body-parser');
const { PORT = 3000 } = process.env;
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const cardRoutes = require('./routes/card');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '60ccd15faca65461cceaa7d7',
  };

  next();
});

app.use('/', userRoutes);
app.use('/', cardRoutes);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log('server start');
});