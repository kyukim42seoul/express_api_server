const bodyParser = require("body-parser");
let express = require("express");
let cors = require("cors");
let app = express();

app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("server response GET");
});

app.post("/post", (req, res) => {
  console.log(req.body);
  const user_id = req.body.user_id;
  const user_name = req.body.user_name;

  res.send(`user_id: ${user_id}, user_name: ${user_name}`);
});

app.listen(3000);
