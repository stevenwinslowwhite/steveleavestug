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
        console.log("rowId: " + rowId);
        db.query('SELECT * from blog_entries where id = ' + rowId, function(err,rows) {
              if(err) throw err;
              rows.forEach(function(row) {
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
                                  subject: row.subject,
                                  date: row.entry_date,
                                  content: elements,
                                  id: row.id
                                };
                                res.render('index', { entry: entry, subjects: subjects });
                    });
                    subjects.push(row.short_subject);
              });
        });
      });
});

module.exports = router;
