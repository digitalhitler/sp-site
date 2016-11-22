const express = require('express');

const APIResponse = require('../../lib/APIResponse');

const router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
  let result = new APIResponse({
    'currentVersion': '1',
    'defaultLocale': 'ru-RU',
    'packageInfo': require('../../package.json')
  });
  res.json(result.toJSON());
});

module.exports = router;
