var express = require('express');
var router = express.Router();
var db = require('../db');
var rss = require('rss');

/* GET comments. */
router.get('/', function(req, res) {
	var feed = new rss({
	    title: 'Steve Leaves Tug',
	    description: 'Blogging about my adventures',
	    feed_url: 'http://steveleavestug.com/feed',
	    site_url: 'http://steveleavestug.com',
	    image_url: 'http://steveleavestug.com/tug.jpg',
	    language: 'en',
    	webMaster: 'Steven White',
	    pubDate: 'April 7, 2016 00:00:00 GMT',
	    ttl: '60'
	});
	
	/* loop over data and add to feed */
    db.query('SELECT * from blog_entries where is_published = true', function(err,rows) {
    	console.log("rows: " + rows);
    	rows.forEach(function(entry_row) {
			feed.item({
			    title:  entry_row.short_subject,
			    description: entry_row.description,
			    url: 'http://steveleavestug.com/?entry=' + entry_row.id, 
			    author: 'Steven White',
			    date: entry_row.entry_date
			});
        });
		// cache the xml to send to clients 
		var xml = feed.xml({indent: true});


		res.set('Content-Type', 'text/xml');
		res.send(xml);
    });
});

module.exports = router;
