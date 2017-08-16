var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/edit/:id',(req,res) => {
  res.render('edituser')
})

router.get('/delete/:id',(req,res) => {
  res.redirect('/')
})


module.exports = router;
