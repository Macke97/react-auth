const express = require('express');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const apiRouter = require('./routes/api');
const passportConfig = require('./config/passport-config');
const passport = require('passport');
const cors = require('cors');

mongoose
  .connect(
    'mongodb://localhost:27017/reactauth',
    { useNewUrlParser: true }
  )
  .then(() => console.log('DB Connected!'))
  .catch(err => console.log('DB connection failed!', err));

// Init app
const app = express();
const port = process.env.PORT || 4000;

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: 'supersecret',
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

app.use(express.static(path.join(__dirname, '..', 'build')));

//Init passport.js
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRouter);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(port, () => console.log('Server started on port ' + port));
