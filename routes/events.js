const express = require('express');
const router = express.Router();
// const model = require('../models')

router.get('/',(req,res) => {
  res.render('event')
})

router.get('/addevent',(req,res) => {
  models.Event.findAll()
  .then(events => {
    res.render('addevent', {
      title: 'Event List',
      events: events
    })
  })
})

// router.post('/',(req,res) => {
//   model.Event.create({
//     title: req.body.tittle,
//     description: req.body.description,
//     place: req.body.place,
//     datetime: new Date(),
//     CategoryId:"",
//     UserId: ""
//   })
//   .then(() => {
//
//   })
// })

module.exports = router;
