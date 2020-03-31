const router = require('express').Router();

router.get('/', function(req, res, next) {
  res.send('Post code value');
});

module.exports = router;
