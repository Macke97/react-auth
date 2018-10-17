const router = require('express').Router();
const User = require('../models/User');
const passport = require('passport');
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  // Check if email exists
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: 'Användaren finns redan!' });
    }

    const newUser = await new User({ email, password }).save();
    req.login(newUser, err => {
      if (err) {
        return console.log(err);
      }
      return res.status(201).json({ success: true, message: 'Användare skapad!' });
    });
  } catch (err) {
    console.log(err);
  }
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log(req.body);
  res.json({ success: true, user: { email: req.user.email } });
});

router.get('/login', (req, res) => {
  if (!req.user) {
    res.json({ authenticated: false, user: {} });
  } else {
    const { email } = req.user;
    res.json({ authenticated: true, user: { email } });
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Logged out!' });
});

module.exports = router;
