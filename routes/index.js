const express = require('express');
const router = express.Router();
const models = require('../models')
const crypto = require('crypto')
const getRecommendedEvents = require('../helpers/getRecommendedEvents')
const randomSalt = require('../helpers/randomSalt')


router.get('/', (req, res, next) => {
  if (req.session.hasOwnProperty('username')) //if loggedin
    res.redirect('/dashboard')
  else
    next()
}, (req, res, next) => {
  res.redirect('/login')
});

router.get('/dashboard', (req, res, next) => {
  if (!req.session.hasOwnProperty('username')) //if not loggedin
    res.redirect('/')
  else
    next()
}, (req, res) => {
  models.Event.findAll({
    include: [{
      model: models.Category
    }]
  })
  .then(events => {
    // res.send(getRecommendedEvents(events, req.session.interests))
    res.render('dashboard', {
      title: 'Dashboard',
      allEvents: events,
      recommendedEvents: getRecommendedEvents(events, req.session.interests),
      session: req.session
    })
  })
  .catch(err => {
    throw(err)
  })
})

router.get('/login', (req, res, next) => {
  if (req.session.hasOwnProperty('username'))
    res.redirect('/')
  else
    next()
}, (req, res) => {
  res.render('login', {
    title: 'Login',
    session: req.session,
    err: req.query.err,
    good: req.query.good
  })
})

router.post('/login', (req, res, next) => {
  if (req.session.hasOwnProperty('username'))
    res.redirect('/')
  else
    next()
}, (req, res) => {
  models.User.findOne({
    where: {username: req.body.username},
    include: [{
      model: models.Category
    }]
  })
  .then(user => {
    // console.log(req.session);
    if (user != null) {
      let inputPassword = crypto.createHmac('sha256', user.salt).update(req.body.password).digest('hex')
      if (inputPassword == user.password) {
        req.session.UserId = user.id
        req.session.username = user.username
        req.session.interests = user.Categories.map(category => {return category.id})
        // console.log(user.id);
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

router.get('/signup', (req, res, next) => {
  if (req.session.hasOwnProperty('username'))
    res.redirect('/')
  else
    next()
}, (req, res) => {
  res.render('signup', {
    title: 'Sign Up',
    session: req.session,
    err: req.query.err
  })
})

router.post('/signup', (req, res, next) => {
  if (req.session.hasOwnProperty('username'))
    res.redirect('/')
  else
    next()
}, (req, res) => {
  if (req.body.password == '' || req.body.repeatPassword == '')
    res.redirect(`/signup?err=Password can't be empty!`)
  else
    models.User.findOne({where: {username: req.body.username}})
    .then(result => {
      if (result != null)
        res.redirect('/signup?err=Username already taken!')
      else {
        let insertUser = () => {
          let insert = {
            full_name: req.body.full_name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            role: req.body.role,
            salt: randomSalt(8)
          }

          models.User.create(insert)
          .then(() => {
            res.redirect('/login?good=Silahkan Login')
          })
          .catch(err => {
            if(err.message == 'salt must be unique')
              insertUser()
            else
              res.redirect(`/signup?err=${err.errors[0].message}`)
          })
        }
        insertUser()
      }
    })
})

router.get('/logout', (req, res, next) => {
  if (!req.session.hasOwnProperty('username'))
    res.redirect('/')
  else
    next()
}, (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})

module.exports = router;
