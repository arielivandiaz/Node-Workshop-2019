var express = require('express');
var router = express.Router();

// Index
router.get('/', (req, res) => {

  res.render('index.ejs', {
    message: 'Hello Express World'
  });
});


router.post('/', (req, res) => {

  console.log("User name is : ", req.body.name);

  res.render('welcome.ejs', {
    message: 'Hello Express World',
    name: req.body.name
  });
});

module.exports = router;