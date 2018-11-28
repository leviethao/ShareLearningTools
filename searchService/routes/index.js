var express = require('express');
var router = express.Router();
const SearchPostController = require('../controllers/SearchPostsController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/search/:searchStr', SearchPostController.searchPosts)

module.exports = router;
