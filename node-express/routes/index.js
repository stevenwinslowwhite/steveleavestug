var express = require('express');
var router = express.Router();
var db = require('../db');
var app = express();

/* GET home page. */
router.get('/', function(req, res, next) {

	var subjectLines = [];
	db.query('SELECT * FROM blog_entries',function(err,rows){
	  if(err) throw err;
      rows.forEach(function(row) {
      	subjectLines.push(row.subject);
      });
	  res.render('index', { subjects: subjectLines });
	});
});

module.exports = router;
