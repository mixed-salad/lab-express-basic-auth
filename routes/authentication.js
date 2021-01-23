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
      res.redirect('/profile');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
