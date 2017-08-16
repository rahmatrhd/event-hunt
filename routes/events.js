const express = require('express');
const router = express.Router();
const models = require('../models')

router.use((req, res, next) => {
  if (!req.session.hasOwnProperty('username')) //if not loggedin
    res.redirect('/')
  else
    next()
})

router.get('/new',(req,res) => {
  models.Event.findAll()
  .then(events => {
    res.render('events-new', {
      title: 'New Event',
      session:req.session,
      events: events
    })
  })
  .catch(err => {
    throw err
  })
})

module.exports = router;
