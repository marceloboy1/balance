const db = require("./db");
const path = require('path');
const express = require("express");
const cors = require("cors");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const PORT = process.env.PORT || 3001;

const app = express();

// Have Node serve the files for our built React app
app.use(cors());
app.use(express.json());

//recebe a requisição do front e faz a call no DB
//esta com um BUG pois aceita o mesmo usuário
app.post("/register", (req, res) => {
  const user = req.body.user;
  const hash = req.body.hash;
  const query = 'INSERT INTO users (user, hash) VALUES (?, ?)';
  (async postData => {
    const resp = await db.postUser(query, user, hash);
    if ( resp != 0 ) {
      res.statusCode = 409
    }
    console.log(resp)
    res.json(resp)
  })();

});

app.post("/login", (req, res) => {
  console.log("Loggin in")
  const user = req.body.user;
  const hash = req.body.hash;
  const query = 'SELECT * FROM users WHERE user = ?';
  (async postData => {
    const resp = await db.getUser(query, user);
    //const sessionUser = resp[0][0]
    if (bcrypt.compare(hash, resp[0][0]["hash"])){
      console.log("SUCCESS")
      const token = jwt.sign(user, 'secret-key');
      console.log('Token gerado:', token);
      const sessionUser = {
        'id': resp[0][0]['id'],
        'user': resp[0][0]['user'],
        'token': token
      }

      res.json(sessionUser)
    }
    else {
      console.log("Failure")
      res.json(resp)
    }
    
  })();

});

// Handle GET requests to /gastos route
app.get("/gastos", (req, res) => {
  (async getData => {
    console.log("Fecthing data")
    const [data] = await db.getStocks('SELECT * FROM gastos');
    console.log(data)
    res.json(data);
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
  console.log(req.body.newFormData)
  const id = req.body.newFormData.id
  const gasto = req.body.newFormData.gasto;
  const categoria = req.body.newFormData.categoria;
  const valor = req.body.newFormData.valor;
  const query = 'UPDATE gastos SET gasto = ?,  categoria = ?, valor = ? WHERE id = ?';
  (async postData => {
    await db.putGastos(query, gasto, categoria, valor, id);
  })();
  console.log("Item atualizado: ", gasto)
  res.send('Resposta enviada com sucesso!');
});

app.delete("/gastos", (req, res) => {
  console.log(req.body)
  const id = req.body.row.id
  const gasto = req.body.row.gasto
  const query = 'DELETE from gastos WHERE id = ?';
  (async postData => {
    await db.deleteGastos(query, id);
  })();
  console.log("Item deletado: ", gasto)
  res.send('Gasto deletado com sucesso!');
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/src', 'index.js'));
});