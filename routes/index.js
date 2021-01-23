const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/profile', (req, res, next) => {
  res.render('profile');
})

router.get('/main', (req, res, next) => {
  if(req.user){
    res.render('main');
  } else {
    res.redirect('/authentication/log-in');
  }
});

router.get('/private', (req, res, next) => {
  if(req.user){
    res.render('private');
  } else {
    res.redirect('/authentication/log-in');
  }
});

module.exports = router;
