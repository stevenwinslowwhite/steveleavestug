var mysql  = require('mysql');
var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];

var connection = mysql.createConnection({
    host     : config.database.host,
    user     : config.database.user,
    password : config.database.password,
    port     : config.database.port,
    database : config.database.name
});

connection.connect(function(err) {
    if (err) {
    console.error('error connecting: ' + err.stack);
    return;
}});

module.exports = connection;