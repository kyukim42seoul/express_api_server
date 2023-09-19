const bodyParser = require("body-parser");
let express = require("express");
let app = express();


let cors = require("cors");

const corsOption = {
  origin: 'http://localhost:5173',
  Credentials: true,
};

app.use(cors(corsOption));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("/ required");
});

app.get("/api/login", (request, response) => {
  response.setHeader('Set-Cookie', 'logged_in=yes');
});

app.listen(3000);
