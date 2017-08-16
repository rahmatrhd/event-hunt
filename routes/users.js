var express = require('express');
var router = express.Router();
var models = require('../models')


/* GET users listing. */
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
  res.render('edituser')
})

router.get('/delete/:id',(req,res) => {
  res.redirect('/')
})


module.exports = router;
