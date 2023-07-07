let mysql = require("mysql");
let connection = mysql.createConnection({
  host: "localhost",
  user: "kyukim",
  password: "kim13245",
});

/*
connection.connect();

connection.query("SELECT 1 + 1 AS solution", (err, rows, fields) => {
  if (err) throw err;
  console.log("The solution is: ", rows[0].solution);
  console.log(rows);
});

connection.end();
*/
let express = require("express");
let cors = require("cors");
let app = express();

app.use(cors());
app.get("/", (req, res) => {
  connection.connect();

  data = connection.query("SELECT 1 + 1 AS solution", (err, rows, fields) => {
    if (err) throw err;
    return rows[0].solution;
  });
  console.log(data);

  connection.end();
  res.send("hi");
});

app.listen(3000);
