const express = require('express');
const router = express.Router();
const models = require('../models');

router.use((req, res, next) => {
  if (!req.session.hasOwnProperty('username')) //if not loggedin
    res.redirect('/')
  else
    next()
})

router.get('/', (req, res) => {
  models.User.findById(req.session.UserId)
  .then(user => {
    if (user == null)
      res.render('users', {
        title: 'User not found',
        user: user,
        session: req.session
      })
    else
      res.render('users', {
        title: user.full_name,
        user: user,
        session: req.session
      })
  })
  .catch(err => {
    throw err
  })
});

router.get('/add-interest', (req, res) => {
  models.Category.findAll({
    include: [{
      model: models.Interest,
      where: {UserId: req.session.UserId},
      required: false,
    }]
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
