var express = require('express');
var router = express.Router();
var db = require('../db');
var app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
      var sql = 'SELECT MAX(ID) as ID from blog_entries';
      if (req.query.seeUnpublished !== "true") {
        sql += ' where is_published = true';
      }
      db.query(sql, function(err, rows) {
        var rowId = rows[0].ID;
        var queryParamId = null;
        if (!isNaN(parseFloat(req.query.entry)) && isFinite(req.query.entry) && req.query.entry <= rowId
            && req.query.entry >= 0) {
          queryParamId = req.query.entry;
        }
        if (queryParamId === null) {
            setupModelForEntryId(rowId, req, res);
        } else {
          db.query('SELECT * FROM blog_entries where id = ' + queryParamId, function(err, rows) {
            var queryRow = rows[0];
            if (queryRow != null && queryRow.id == queryParamId) {
              setupModelForEntryId(queryParamId, req, res);
            } else {
              setupModelForEntryId(rowId, req, res);
            }
          });
        }
      });
});

function setupModelForEntryId(rowId, req, res) {
    var entry = null;
    var elements = [];
    var subjects = [];
    db.query('SELECT * from blog_entries where id = ' + rowId, function(err,rows) {
        var blog_entry = rows[0];
        if (!blog_entry) {
          return;
        }
        db.query('SELECT * from blog_entry_entries where blog_entry_id = ' + rowId + 
                     ' order by entry_number asc', function(err, entry_rows) {
            if(err) throw err;
            entry_rows.forEach(function(entry_row) {
                  elements.push({
                    content: entry_row.entry_content,
                    content_type: entry_row.entry_type,
                    class: entry_row.style_class
                  });
            });
            entry = {
              subject: blog_entry.subject,
              date: blog_entry.entry_date,
              content: elements,
              id: blog_entry.id
            };
            var sql = 'SELECT short_subject, id from blog_entries';
            if (req.query.seeUnpublished !== "true") {
              sql +=  ' where is_published = true';
            }
            db.query(sql, function(err, rows) {
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
}

module.exports = router;
