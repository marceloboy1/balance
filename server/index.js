const db = require("./db");
const path = require('path');
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3001;

const app = express();

// Have Node serve the files for our built React app
app.use(cors());
app.use(express.json());

(async getData => {
  console.log("Select stocks");
  //const [stoks] = await db.selectItems();
  
  //const [data] = await db.selectItems();
  //console.log(stoks)
})();

const data = require('./data.json');
// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/src', 'index.js'));
});