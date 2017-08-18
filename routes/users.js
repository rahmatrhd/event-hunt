const express = require('express');
const router = express.Router();
const models = require('../models');
const dateToStringShow = require('../helpers/dateToStringShow')

router.use((req, res, next) => {
  if (!req.session.hasOwnProperty('username')) //if not loggedin
    res.redirect('/')
  else
    next()
})

router.get('/', (req, res) => {
  models.User.findById(req.session.UserId, {
    include: [{
      model: models.Event,
      as: 'myEvents',
      include: [{
        model: models.Category
      }]
    }, {
      model: models.User_Event,
      include: [{
        model: models.Event,
        include: [{
          model: models.User
        }]
      }]
    }],
    order: [
      [{model: models.Event, as: 'myEvents'}, 'datetime', 'ASC'],
      [models.User_Event, models.Event, 'datetime', 'ASC']
    ]
  })
  .then(user => {
    // user.getMyEvents({
    //   include: [{
    //     model: models.Category
    //   }]
    // })
    // .then(myEvents => {
      // res.send(events)
      res.render('users', {
        title: user.full_name,
        user: user,
        session: req.session,
        dateToStringShow: dateToStringShow
      })
    // })
  })
  .catch(err => {
    throw err
  })
});

router.get('/:id', (req, res) => {
  if (req.params.id == req.session.UserId)
    res.redirect('/users')
  else
    models.User.findById(req.params.id, {
      include: [{
        model: models.Event,
        as: 'myEvents',
        include: [{
          model: models.Category
        }]
      }, {
        model: models.User_Event,
        include: [{
          model: models.Event,
          include: [{
            model: models.User
          }]
        }]
      }],
      order: [
        [{model: models.Event, as: 'myEvents'}, 'datetime', 'ASC'],
        [models.User_Event, models.Event, 'datetime', 'ASC']
      ]
    })
    .then(user => {
      // user.getMyEvents({
      //   include: [{
      //     model: models.Category
      //   }]
      // })
      // .then(myEvents => {
        // res.send(events)
        res.render('users-single', {
          title: user.full_name,
          user: user,
          session: req.session,
          dateToStringShow: dateToStringShow
        })
      // })
    })
    .catch(err => {
      throw err
    })
})

router.get('/add-interest', (req, res) => {
  models.Category.findAll({
    include: [{
      model: models.Interest,
      where: {UserId: req.session.UserId},
      required: false,
    }],
    order: [['label', 'ASC']]
  })
  .then(categories => {
    // res.send(categories)
    res.render('add-interest', {
      title: 'Add Interest',
      categories: categories,
      session: req.session
    })
  })
  .catch(err => {
    throw err
  })
})

router.post('/add-interest', (req, res) => {
  // res.send(req.body)
  models.Interest.destroy({where: {UserId: req.session.UserId}})
  .then(() => {
    // res.send(req.body)
    if (!Array.isArray(req.body.categories))
      req.body.categories = [req.body.categories]

    let promises = req.body.categories.map(category => {
      return new Promise((resolve, reject) => {
        models.Interest.create({
          UserId: req.session.UserId,
          CategoryId: category
        })
        .then(() => {
          resolve()
        })
        .catch(err => {
          throw err
        })
      })
    })

    Promise.all(promises)
    .then(() => {
      // res.send(asd)
      return models.User.findById(req.session.UserId, {include: [{model: models.Category}]})
    })
    .then(user => {
      // res.send(user);
      req.session.interests = user.Categories.map(category => {return category.id})
      res.redirect('/users')
    })
    .catch(err => {
      throw err
    })
  })
  .catch(err => {
    throw err
  })
})

module.exports = router;
