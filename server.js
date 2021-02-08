const express = require('express')
const app = express()
const port = 8080
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('Database/test.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the  SQlite database.');
});


app.get('/api', (req, res) => {
    let place = (req.query.page?req.query.page:1)*100;

    if (req.query.search){
        //quick implementation of fuzzy search
         sql = `SELECT * FROM data WHERE (Region LIKE '${req.query.search}%' OR Country LIKE '${req.query.search}%' OR Item_Type LIKE '${req.query.search}%' OR Sales_Channel LIKE '${req.query.search}%' OR Order_Priority LIKE '${req.query.search}%' OR Order_Date LIKE '${req.query.search}%' OR Order_ID LIKE '${req.query.search}%' OR Ship_Date LIKE '${req.query.search}%' OR Units_Sold LIKE '${req.query.search}%' OR Unit_Price LIKE '${req.query.search}%' OR Unit_Cost LIKE '${req.query.search}%' OR Total_Revenue LIKE '${req.query.search}%' OR Total_Cost LIKE '${req.query.search}%' OR Total_Profit LIKE '${req.query.search}%') limit 100 offset ${place}`;
        // sql = `SELECT * FROM data WHERE '${req.query.search}' IN (Region,Country,Item_Type,Sales_Channel,Order_Priority,Order_Date,Order_ID,Ship_Date,Units_Sold,Unit_Price,Unit_Cost,Total_Revenue,Total_Cost,Total_Profit) limit 100 offset ${place}`;
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



