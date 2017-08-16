const express = require('express');
const router = express.Router();
const models = require('../models');

router.use

router.get('/:id', (req, res) => {
  models.User.findById(req.params.id)
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

router.get('/edit/:id',(req,res) => {
  models.User.findById(req.params.id)
    .then(users => {
      res.render('edituser',{
        title: 'Event List',
        session:req.session,
        users:users
      })
    })
    .catch(err => {
      throw err
    })
})

router.get('/delete/:id',(req,res) => {
  model.User.destroy({where: {id: req.params.id}})
  .then(user => {
    res.redirect('/users')
  })
  .catch(err => {
    throw err
  })
})


module.exports = router;
