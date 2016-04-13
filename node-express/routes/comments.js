var express = require('express');
var router = express.Router();
var db = require('../db');
var app = express();

/* GET comments. */
router.get('/', function(req, res, next) {
	console.log('got comments request');
    if (!isNaN(parseFloat(req.query.entry)) && isFinite(req.query.entry)) {
		db.query('SELECT * FROM comments where entry_reference = ' + req.query.entry, function(err, rows) {
        	res.send(rows);
        });
    } else {
    	res.send("ERROR");	
    }
});

router.post('/', function(req, res) {
	var name = req.body.name;
	if (name == "Steven" || name == "steven"
		|| name == "Steve" || name == "steve") {
		name = "Somebody who tried to use Steven as their name";
	} else if (name === "mypass") {
		name = "Steven";
	}
	var comment = { name: name, comment: req.body.comment,
		entry_date: new Date(), entry_reference: req.body.entry_reference };

	db.query('INSERT INTO comments SET ?', comment, function(err, res) {
		if (err) throw err;
		console.log('Inserted values to comments');
	});
	var url = req.header("Referer") + "#comments";
	res.redirect(url);
});

module.exports = router;
