var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',(req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/login',(req,res) => {
  res.render('login',{title:'Express'})
})

router.get('/signup',(req,res) => {
  res.render('signup',{title:'Express'})
})


module.exports = router;
