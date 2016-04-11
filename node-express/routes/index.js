var express = require('express');
var router = express.Router();
var db = require('../db');
var app = express();

/* GET home page. */
router.get('/', function(req, res, next) {

      var entry = null;
      var elements = [];
      var subjects = [];
      db.query('SELECT MAX(ID) as ID from blog_entries', function(err, rows) {
        var rowId = rows[0].ID;
        if (!isNaN(parseFloat(req.query.entry)) && isFinite(req.query.entry) && req.query.entry <= rowId
            && req.query.entry >= 0) {
          rowId = req.query.entry;
        }
        db.query('SELECT * from blog_entries where id = ' + rowId, function(err,rows) {
            var blog_entry = rows[0];
            if (!blog_entry) {
              return;
            }
            if(err) throw err;
            db.query('SELECT * from blog_entry_entries where blog_entry_id = ' + rowId + 
                         ' order by entry_number asc', function(err, entry_rows) {
                              if(err) throw err;
                              entry_rows.forEach(function(entry_row) {
                                    elements.push({
                                      content: entry_row.entry_content,
                                      content_type: entry_row.entry_type
                                    });
                              });
                              entry = {
                                subject: blog_entry.subject,
                                date: blog_entry.entry_date,
                                content: elements,
                                id: blog_entry.id
                              };
                              db.query('SELECT short_subject, id from blog_entries', function(err, rows) {
                                rows.forEach(function(subject) {
                                  subjects.push({
                                    id: subject.id,
                                    name: subject.short_subject
                                  });
                                });
                                res.render('index', { entry: entry, subjects: subjects });
                              });
                  });
            });
        });
});

module.exports = router;
