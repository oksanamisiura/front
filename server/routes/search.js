var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/search', function(req, res, next) {
  res.json({
    query: req.query.query
  });
});

module.exports = router;
