const express = require('express');
const router = express.Router();
const models = require('../models');
/* GET users listing. */


router.get('/', function(req, res, next) {
  models.user.findall()
  .then (users => {
    res.render('/users',{
      title:'Event List',
      session:req.session,
      users:users
     });
   })
   .catch(err => {
     throw err
   })
});

router.get('/edit/:id',(req,res) => {
  models.User.findbyid(req.params.id)
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
  var id = req.params.id
  model.User.destroy({
    where: {id: id}
    })
    .then(user => {
      res.redirect('/users')
    })
    .catch(err => {
      throw err
    })
})


module.exports = router;
