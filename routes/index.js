var express = require('express');
var router = express.Router();
var models = require('../models')
var crypto = require('crypto')
var getRecommendedEvents = require('../helpers/getRecommendedEvents')

router.get('/', (req, res, next) => {
  if (req.session.hasOwnProperty('username')) //if loggedin
    res.redirect('/dashboard')
  else
    next()
}, (req, res, next) => {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/dashboard', (req, res, next) => {
  if (!req.session.hasOwnProperty('username')) //if not loggedin
  //   res.redirect('/')
  // else
    next()
}, (req, res) => {
  models.Event.findAll()
  .then(events => {
    res.render('dashboard', {
      title: 'Dashboard',
      allEvents: events,
      recommendedEvents: getRecommendedEvents(events),
      session: req.session
    })
  })
  .catch(err => {
    throw(err)
  })
})

router.post('/login', (req, res, next) => {
  if (req.session.hasOwnProperty('username'))
    res.redirect('/')
  else
    next()
}, (req, res) => {
  models.User.findOne({
    where: {username: req.body.username}
  })
  .then(user => {
    // console.log(req.session);
    if (user != null) {
      let inputPassword = crypto.createHmac('sha256', user.salt).update(req.body.password).digest('hex')
      if (inputPassword == user.password) {
        req.session.username = user.username
        req.session.role = user.role

        res.redirect('/')
      } else
      res.redirect('/login?err=Password salah!')
    } else
      res.redirect('/login?err=User not found')
  })
  .catch(err => {
    throw err
  })
})

router.post('/signup', (req, res) => {
  models.User.create(req.body)
  .then(() => {
    res.redirect('/login?good=Silahkan Login')
  })
  .catch(err => {
    throw err
  })
})

module.exports = router;
