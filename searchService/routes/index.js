var express = require('express');
var router = express.Router();
const SearchPostController = require('../controllers/SearchPostsController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const PREFIX = '/search'

router.get(PREFIX + '/searchPosts/:searchStr', SearchPostController.searchPosts)

module.exports = router;
