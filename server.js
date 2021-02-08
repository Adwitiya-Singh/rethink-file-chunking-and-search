const express = require('express')
const app = express()
const port = 3000
const parse   = require('csv-parse');
const fs = require('fs')
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('Database/test.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the  SQlite database.');
});


app.get('/', (req, res) => {
    let place = (req.query.page?req.query.page:1)*100;

    if (req.query.search){
        sql = `SELECT * FROM data WHERE '${req.query.search}' IN (Region,Country,Item_Type,Sales_Channel,Order_Priority,Order_Date,Order_ID,Ship_Date,Units_Sold,Unit_Price,Unit_Cost,Total_Revenue,Total_Cost,Total_Profit) limit 100 offset ${place}`;
    }else {

        sql = `SELECT * FROM data limit 100 offset ${place}`;
    }

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });

})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})



