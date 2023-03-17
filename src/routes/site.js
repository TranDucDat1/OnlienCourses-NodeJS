// file này sẽ chứa những controller --còn lại-- như HOME, Contact, Search
var express = require('express');
var router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.get('/search', siteController.search);
router.get('/', siteController.index);

module.exports = router;
