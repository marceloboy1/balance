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

module.exports = {getStocks, postUser}


