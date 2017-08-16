const express = require('express');
const router = express.Router();
const models = require('../models')

router.get('/',(req,res) => {
  models.Event.findall()
  .then(events => {
    res.render('event',{
      title: 'Event List',
      session: req.session,
      events:events
    })
  })
  .catch(err => {
    throw err
  })
})

router.get('/addevent',(req,res) => {
  models.Event.findAll()
  .then(events => {
    res.render('addevent', {
      title: 'Event List',
      session:req.session,
      events: events
    })
  })
  .catch(err => {
    throw err
  })
})

module.exports = router;
