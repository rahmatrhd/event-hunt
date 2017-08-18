const express = require('express');
const router = express.Router();
const models = require('../models')
const dateToStringForm = require('../helpers/dateToStringForm')
const dateToStringShow = require('../helpers/dateToStringShow')
const dateToDatabase = require('../helpers/dateToDatabase')

router.use((req, res, next) => {
  if (!req.session.hasOwnProperty('username')) //if not loggedin
    res.redirect('/')
  else
    next()
})

router.get('/new', (req, res) => {
  models.Event.findAll()
  .then(events => {
    models.Category.findAll()
    .then(categories => {
      res.render('events-new', {
        title: 'New Event',
        session: req.session,
        combobox: categories,
        events: events,
        err: req.query.err
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
  // res.send([new Date(req.body.datetime), dateToWIB(new Date(req.body.datetime)), new Date(req.body.datetime).getUTCHours(), new Date(req.body.datetime).getHours()])
  req.body.UserId = req.session.UserId
  req.body.datetime = dateToDatabase(new Date(req.body.datetime))
  if (req.body.datetime >= new Date())
    models.Event.create(req.body)
    .then(() => {
      res.redirect('/dashboard')
    })
    .catch(err => {
      throw err
    })
  else
    res.redirect('/events/new?err=Invalid Date')
})


router.get('/:id', (req, res) => {
  models.Event.findById(req.params.id, {
    include: [
      {model: models.User},
      {model: models.Category},
      {
        model: models.User_Event,
        include: [{
          model: models.User
        }]
      }
    ]
  })
  .then(event => {
    if (event == null)
      res.redirect('/dashboard')
    else
      res.render('events', {
        title: event.title,
        event: event,
        session: req.session,
        dateToStringShow: dateToStringShow,
        participantsId: event.User_Events.map(user => {return user.User.id})
      })
  })
  .catch(err => {
    throw err
  })
})

router.post('/:id', (req, res) => {
  if (req.body.type == 'participate')
    models.User_Event.create({
      UserId: req.session.UserId,
      EventId: req.params.id
    })
    .then(() => {
      res.redirect(`/events/${req.params.id}`)
    })
    .catch(err => {
      throw err
    })
  else
    models.User_Event.destroy({
      where: {
        UserId: req.session.UserId,
        EventId: req.params.id
      }
    })
    .then(() => {
      res.redirect(`/events/${req.params.id}`)
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
  // res.send(req.body)
  req.body.UserId = req.session.UserId
  req.body.datetime = dateToDatabase(new Date(req.body.datetime))
  models.Event.update(req.body, {where: {id: req.params.id}})
  .then(() => {
    res.redirect('/users')
  })
  .catch(err => {
    throw err
  })
})

router.get('/delete/:id', (req, res, next) => {
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
  models.Event.destroy({where: {id: req.params.id}})
  .then(() => {
    res.redirect('/users')
  })
  .catch(err => {
    throw err
  })
})

module.exports = router;
