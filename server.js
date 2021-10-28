const express = require('express');
const path = require('path');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 5000;

var sql_response;
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pass",
  database: "phone_company"
});
//get the sql data and convert to json string
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("SELECT * FROM calls", function (err, result, fields) {//an sql query to get all of the data from the calls table
    if (err) throw err;
    sql_response = JSON.stringify(result);
  });


});

//send the json string on /data
app.get('/data', (req, res) => {
  res.send({ express: sql_response });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
