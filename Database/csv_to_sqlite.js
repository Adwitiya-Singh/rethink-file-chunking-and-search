const sqlite3 = require('sqlite3').verbose();
const fs = require('fs')
const parse   = require('csv-parse');

let db = new sqlite3.Database('test.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the  SQlite database.');
});

let createTable = () => {
    fs.createReadStream("records.csv")
        .pipe(parse({delimiter: ',', to_line: 1}))
        .on('data', function (csvrow) {
            db.run(`CREATE TABLE data((?) text,(?) text,(?) text,(?) text,(?) text,(?) text,(?) text,(?) text,(?) text,(?) text,(?) text,(?) text,(?) text,(?) text)`, csvrow);
        })
        .on('end', function () {
            db.close();
        });
}

let addValues = () => {
    fs.createReadStream("records.csv")
        .pipe(parse({delimiter: ',', from: 2}))
        .on('data', function (csvrow) {
            db.run(`INSERT INTO data(Region,Country,Item_Type,Sales_Channel,Order_Priority,Order_Date,Order_ID,Ship_Date,Units_Sold,Unit_Price,Unit_Cost,Total_Revenue,Total_Cost,Total_Profit) VALUES((?), (?), (?), (?), (?), (?), (?), (?), (?), (?), (?), (?), (?), (?))`, csvrow);
        })
        .on('end', function () {
            db.close();
        });
}

createTable()
addValues()
