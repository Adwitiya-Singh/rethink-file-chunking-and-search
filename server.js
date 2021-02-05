const express = require('express')
const app = express()
const port = 3000
const parse   = require('csv-parse');
const fs = require('fs')

app.get('/', (req, res) => {

    let csvData=[];

    let size = (req.query.page?req.query.page:1)*100;

    fs.createReadStream("records.csv")
        .pipe(parse({delimiter: ',', from:size, to_line:size+100}))
        .on('data', function(csvrow) {
           size+=100;
            csvData.push(csvrow);
        })
        .on('end',function() {
            //do something with csvData
            res.send(csvData)
        });
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})



