const { Router } = require('express');
const router = Router();
const bcryptjs = require('bcryptjs');
const User = require('./../models/user');

router.get('/sign-up', (req, res, next) => {
  res.render('sign-up');
});

router.post('/sign-up', (req, res, next) => {
  const data = req.body;
  User.findOne({
    username: data.username
  })
    .then((user) => {
      if (user) {
          throw new Error('This username is already been used');
      } else {
        return bcryptjs.hash(data.password, 10);
      }
    })
    .then((hashedPassword) => {
      return User.create({
        username: data.username,
        hashedPassword: hashedPassword
      });
    })
    .then((user) => {
      req.session.userId = user._id;
      res.redirect('/profile');
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/log-in', (req, res, next) => {
  res.render('log-in');
});

router.post('/log-in', (req, res, next) => {
  const data = req.body;
  let user;
  User.findOne({
    username: data.username
  })
    .then((doc) => {
      user = doc;
      if (user) {
        return bcryptjs.compare(data.password, user.hashedPassword);
      } else {
        throw new Error('There is no user registered with that username.');
      }
    })
    .then((result) => {
      if (result) {
        req.session.userId = user._id;
        res.redirect('/profile');
      } else {
        throw new Error('The password does not match.');
      }
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/log-out', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
