//select
// /edit/:id
// delete
//read update dellete

const express = require('express');
router = express.Router();

router.get('/',(req,res) => {
  res.render('profile')
})


module.exports = router;
