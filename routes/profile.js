//select
// /edit/:id
// delete
//read update dellete


const express = require('express');
router = express.Router();

router.get('/',(req,res) => {
  res.render('profile')
})

router.get('/edit/:id',(req,res) => {
  res.render('edit')
})

router.get('/delete/:id',(req,res) => {
  res.redirect('/')
})

module.exports = router;
