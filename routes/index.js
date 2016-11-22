const express = require('express');
const router = express.Router();

//const apiRouter = require('./api');

router.use('/', function(req, res, next) {
  debugger;
  console.log(req);
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  debugger;
  res.render('index', { title: 'Express' });
});

//router.use('/api', apiRouter);

module.exports = router;
