//goal
//select
//add

const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
  res.render('goal')
})

router.get('/addgoal',(req,res) => {
  res.render('addgoal')
})

module.exports = router;
