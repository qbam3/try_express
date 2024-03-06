var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Politeknik Elektronika Negeri Surabaya' });
});

module.exports = router;
