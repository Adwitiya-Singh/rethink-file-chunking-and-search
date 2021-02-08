const CSV2SQL = require('csv2sql-lite');


var fs = require('fs');
var rstream = fs.createReadStream('./records.csv');
var wstream = fs.createWriteStream('./mysql.sql');

var csv2sql = CSV2SQL({
    tableName: 'test',
    dbName: 'testDb',
});

rstream.pipe(csv2sql).pipe(wstream);
