//este objeto es el encargado de tener la configuracion
require('dotenv').config();

export default{
    database:{
        //Aqui se coloca la dirreccion ip en caso de ser de un servidor, mi caso localhost
        connectionLimit : 10,
        host: process.env.DB_HOSTNAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
}