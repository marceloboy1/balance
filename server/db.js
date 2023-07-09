async function connect(){

    if (global.connection && global.connection.state !== 'disconnected')
        return global.connection;
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:Plbgpl01@localhost:3306/balance")
    console.log("Conectado no BD");
    global.connection = connection;
    return connection;
}
connect();

async function getStocks(query){
    const conn = await connect();
    return await conn.query(query);
}

//função que posta os usuários
async function postUser(query,user,pwd){
    const conn = await connect();
    return await conn.query(query, [user, pwd], (error, results, fields) => {
        if (error) throw error;
        console.log('Dados inseridos com sucesso!');
      });
}

//função que pega os gasto
async function getGastos(query){
    const conn = await connect();
    return await conn.query(query, (error, results, fields) => {
        if (error) throw error;
      });
}

//função que posta os gastos
async function postGastos(query,gasto,categoria, valor){
    const conn = await connect();
    return await conn.query(query, [gasto, categoria, valor], (error, results, fields) => {
        if (error) throw error;
      });
}


//função que atualiza os gastos
async function putGastos(query,gasto,categoria, valor, id){
    const conn = await connect();
    return await conn.query(query, [gasto, categoria, valor, id], (error, results, fields) => {
        if (error) throw error;
      });
}

module.exports = {getStocks, postUser, getGastos, postGastos, putGastos}


