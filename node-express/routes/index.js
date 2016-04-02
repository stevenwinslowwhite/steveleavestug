var express = require('express');
var router = express.Router();
var db = require('../db');
var app = express();

/* GET home page. */
router.get('/', function(req, res, next) {

	var entries = [];
	db.query('SELECT * FROM blog_entries',function(err,rows){
	  if(err) throw err;
      rows.forEach(function(row) {
      	entries.push({
      		subject: row.subject,
      		content: row.entry_text,
      		date: row.entry_date
      	});
      });
	  res.render('index', { entries: entries });
	});
});

module.exports = router;
