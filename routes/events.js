const express = require('express');
const router = express.Router();
const models = require('../models')
const dateToStringForm = require('../helpers/dateToStringForm')

router.use((req, res, next) => {
  if (!req.session.hasOwnProperty('username')) //if not loggedin
    res.redirect('/')
  else
    next()
})

router.get('/new', (req,res) => {
  models.Event.findAll()
  .then(events => {
    models.Category.findAll()
    .then(categories => {
      res.render('events-new', {
        title: 'New Event',
        session: req.session,
        combobox: categories,
        events: events
      })
    })
    .catch(err => {
      throw err
    })
  })
  .catch(err => {
    throw err
  })
})

router.post('/new', (req, res) => {
  req.body.UserId = req.session.UserId
  req.body.datetime = new Date(req.body.datetime)
  models.Event.create(req.body)
  .then(() => {
    res.redirect('/dashboard')
  })
  .catch(err => {
    throw err
  })
})

router.get('/edit/:id', (req, res, next) => {
  models.Event.findById(req.params.id)
  .then(event => {
    if (event.UserId == req.session.UserId)
      next()
    else
      res.redirect('/')
  })
  .catch(err => {
    throw err
  })
}, (req, res) => {
  models.Event.findById(req.params.id)
  .then(event => {
    models.Category.findAll()
    .then(categories => {
      event.setDataValue('datetime', dateToStringForm(event.datetime))
      // res.send(event)
      res.render('events-edit', {
        title: 'Edit Event',
        event: event,
        combobox: categories,
        session: req.session
      })
    })
    .catch(err => {
      throw err
    })
  })
  .catch(err => {
    throw err
  })
})

router.post('/edit/:id', (req, res, next) => {
  // res.send(req.body)
  req.body.UserId = req.session.UserId
  req.body.datetime = new Date(req.body.datetime)
  models.Event.update(req.body, {where: {id: req.params.id}})
  .then(() => {
    res.redirect('/users')
  })
  .catch(err => {
    throw err
  })
})

router.get('/delete/:id', (req, res) => {
  models.Event.destroy({where: {id: req.params.id}})
  .then(() => {
    res.redirect('/users')
  })
  .catch(err => {
    throw err
  })
})

module.exports = router;
