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
      if (app.get('env') === 'development') {
	  	res.render('index', { subjects: subjectLines });
	  } else {
	  	res.render('index', { subjects: ["asdf", "fdas"]});
	  }
	});
});

module.exports = router;
