const db = require("./db");
const path = require('path');
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3001;

const app = express();

// Have Node serve the files for our built React app
app.use(cors());
app.use(express.json());

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  (async getData => {
    const [data] = await db.getStocks('SELECT * FROM stocks');
    res.json(data);
    console.log("GETED")
  })();
});

//recebe a requisição do front e faz a call no DB
//esta com um BUG pois aceita o mesmo usuário
app.post("/register", (req, res) => {
  const user = req.body.user;
  const pwd = req.body.pwd;
  const query = 'INSERT INTO users (user, pwd) VALUES (?, ?)';
  (async postData => {
    await db.postUser(query, user, pwd);
    console.log("POSTED")
  })();
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/src', 'index.js'));
});