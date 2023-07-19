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
  })();
});


// Handle GET requests to /api route
app.get("/gastos", (req, res) => {
  (async getData => {
    console.log("Fecthing data")
    const [data] = await db.getStocks('SELECT * FROM gastos');
    res.json(data);
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
  })();

});

app.post("/gastos", (req, res) => {
  const gasto = req.body.newFormData.gasto;
  const categoria = req.body.newFormData.categoria;
  const valor = req.body.newFormData.valor;
  const query = 'INSERT INTO gastos (gasto, categoria, valor) VALUES (?, ?, ?)';
  (async postData => {
    await db.postGastos(query, gasto, categoria, valor);
  })();
  console.log("Item adicionados: ", gasto)
  res.send('Resposta enviada com sucesso!');
});


app.put("/gastos", (req, res) => {
  console.log(req.body)
  res.send('Servidor recebeu a requisição de PUT');
});

app.delete("/gastos", (req, res) => {
  console.log(req.body)
   res.send('Servidor recebeu a requisição de DELETE');
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/src', 'index.js'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});