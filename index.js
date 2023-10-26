const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = 3232;

// DB
let db;

try {
    db = mysql.createConnection({
      host: "127.0.0.1",
      user: "test_twitter",
      password: "kim13245",
      database: "my_db",
      port: 3306,
    });
  } catch(error) {
    console.error("mysql.createConnection error: ", error);
  }


// GET
app.get("/", (req, res) => {
  res.send("Response from Server /");
});

app.get("/api", (req, res)=>{
  const requestData = req.query;
  console.log(req.query);
  res.send(`GET request data: ${JSON.stringify(requestData)}`);
});


// POST
app.post("/api/post", (req, res) => {
  let userId = 1;
  const {userName, userPw, userEmail} = req.body;
  const fields = `(user_id, user_name, user_email, user_pw)`;
  const fullQuery = `INSERT INTO users ${fields} VALUES (?, ?, ?, ?)`;
  const values = [userId, userName, userEmail, userPw];

  console.log('Received POST request with body:', req.body);

  db.connect();

  try {
    db.query(fullQuery, values);
  } catch(error) {
    console.error("Query error: ", error);
  }

  res.send('POST request body received');
});

app.listen(PORT);
