var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'aa171dlwksarfbw.cagxvqgtc5mi.us-west-2.rds.amazonaws.com',
    user     : 'steven',
    password : 'asiaventure',
    port     : 3306,
    database : 'ebdb'
});

connection.connect(function(err) {
    if (err) {
    console.error('error connecting: ' + err.stack);
    return;
}});

module.exports = connection;