const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(
  'local',
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    (email, password, done) => {
      console.log(email);
      User.findOne({ email })
        .then(user => {
          if (!user) {
            return done(null, false);
          }

          // Verify the password
          user.verifyPassword(password, (err, isMatch) => {
            if (err) return done(err);

            if (!isMatch) return done(null, false);

            return done(null, user);
          });
        })
        .catch(err => done(err));
    }
  )
);
