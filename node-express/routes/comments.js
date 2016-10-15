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


function redirect(req, res) {
	var url = req.header("Referer") + "#comments";
	res.redirect(url);
}

module.exports = router;
