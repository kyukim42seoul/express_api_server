let mysql = require("mysql");
let connection = mysql.createConnection({
  host: "",
  user: "",
  password: "",
  database: "",
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
const bodyParser = require("body-parser");
let express = require("express");
let cors = require("cors");
let app = express();

app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  connection.connect();
  /*
  data = connection.query("SELECT * FROM users", (err, rows, fields) => {
    if (err) {
      console.log("err");
      throw err;
    }

    if (fields.length > 0) {
      return JSON.parse(JSON.stringify(fields));
    }
    console.log("rows returned");
    return rows;
  });
  console.log(data);
*/
  connection.end();
  res.send("/ required");
});

app.post("/post", (req, res) => {
  console.log(req.body);
  const user_id = req.body.user_id;
  const user_name = req.body.user_name;

  const querySuccess = connection.query(
    "INSERT INTO users VALUES(?,?)",
    [user_id, user_name],
    (err, result) => {
      if (err) {
        console.log("insert into query failed", err);
      } else {
        res.send("POSTED");
      }
    }
  );
  if (!querySuccess) res.send("POST TRY");
});

app.get("api/users/user_id", (req, res) => {
  connection.connect();

  user_data = connection.query(
    "SELECT user_id FROM users",
    (err, rows, fields) => {
      if (err) throw err;
      console.log("api/users called!");
    }
  );
  const serialized_user_data = String.toString(user_data);
  console.log(`api/users serialized_data : ${serialized_user_data}`);
  res.send({ data: serialized_user_data });
});

app.listen(3000);
