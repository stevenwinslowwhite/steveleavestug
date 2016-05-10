var express = require('express');
var router = express.Router();
var db = require('../db');
var app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
      var sql = 'SELECT MAX(ID) as ID from blog_entries where is_featured = true ';
      if (req.query.seeUnpublished !== "true") {
        sql += ' and is_published = true';
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
                    content: patternMatchContent(entry_row.entry_content),
                    content_type: entry_row.entry_type,
                    class: entry_row.style_class
                  });
            });
            db.query('SELECT * from comments where entry_reference = ' + rowId + ' order by id desc', function(err, comments) {
                entry = {
                  subject: blog_entry.subject,
                  date: blog_entry.entry_date,
                  content: elements,
                  id: blog_entry.id,
                  comments: comments
                };
                var sql = 'SELECT short_subject, id from blog_entries';
                if (req.query.seeUnpublished !== "true") {
                  sql +=  ' where is_published = true order by id desc limit 5';
                }
                db.query(sql, function(err, rows) {
                  rows.forEach(function(subject) {
                    subjects.push({
                      id: subject.id,
                      name: subject.short_subject
                    });
                  });
                  var groupings = {};
                  var groupedEntriesSql = 'SELECT be.id, be.short_subject, be.entry_date, g.group_display_name from blog_entries be join groupings g on g.id = be.grouping where be.is_published = true';
                  db.query(groupedEntriesSql, function(err, groupedEntry) {
                    groupedEntry.forEach(function(entry) {
                      var currentGrouping = [];
                      if (groupings[entry.group_display_name]) {
                        currentGrouping = groupings[entry.group_display_name];
                      }
                      currentGrouping.push({
                        id:  entry.id,
                        subject: entry.short_subject,
                        entryDate: entry.entry_date
                      });
                      groupings[entry.group_display_name] = currentGrouping;
                    });
                    res.render('index', { entry: entry, subjects: subjects, groupings: groupings });
                  });
                });
            });
        });
    });
}

function patternMatchContent(content) {
  if (content == null) {
    return null;
  }
  content = content.replace(new RegExp("''''[.*]''''", 'g'), '<span class="code">$0</span>');
  return content.replace(new RegExp("'''", 'g'), '"');
}

module.exports = router;
