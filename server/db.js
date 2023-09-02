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
    try {
        await conn.query(query, [user, pwd])
        console.log("Usuario cadastrado")
        return(0);
    }
    catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            console.log("Usuario duplicado")
            return(error)
        }
        else{
            console.log('Outro erro:', error)
            return(error)
        }
    }
}

//função que pega os usuários
async function getUser(query, user){
    const conn = await connect();
    try {
        return await conn.query(query, [user])
      }
    catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            console.log("Usuario duplicado")
            return(error)
        }
        else{
            console.log('Outro erro:', error)
            return(error)
        }
    }
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

async function deleteGastos(query, id){
    const conn = await connect();
    return await conn.query(query, [id], (error, results, fields) => {
        if (error) throw error;
      });
}

//função que pega os dados
async function getCategorias(query, userId){
    const conn = await connect();
    return await conn.query(query, [userId]);
}

//função que atualiza os gastos
async function putCategorias(query, valor, id, userId)
{
    const conn = await connect();
    return await conn.query(query, [valor, id, userId], (error, results, fields) => {
        if (error) throw error;
      });
}

module.exports = {getStocks, postUser, getUser, getGastos, postGastos, putGastos, deleteGastos, putCategorias, getCategorias}


