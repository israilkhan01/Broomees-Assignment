const mysql = require("mysql2");
const dotenv  = require("dotenv")
dotenv.config("../")
// const pool = mysql.createPool({
//   host: 'localhost',
//   user:'root',
//   password:'root',
// }).promise()

const pool =  mysql.createPool({
  host:process.env.HOST,
  user:process.env.USER,
  password:process.env.PASSWORD,
  database:process.env.DBNAME,
  port:3306
}).promise();

const results = ()=>{
  return new Promise((resolve, reject) =>{
    pool.query("SELECT * FROM USERS",[],(error,results)=>{
      if(error) reject(error);
      else resolve(results)
    })
  });
}
results().then((results)=>{
  console.log(results);
}).catch((error)=>{
  console.log(error);
})

// function CreateSchema(){
//   const createDatabaseQuery = 'CREATE DATABASE IF NOT EXISTS broomees';
//   const useDatabaseQuery = 'USE broomees';

//   const createUserTable = `CREATE TABLE USERS(
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       firstname VARCHAR(255) NOT NULL,
//       lastname VARCHAR(255) NOT NULL,
//       email VARCHAR(255) NOT NULL,
//       username VARCHAR(255) NOT NULL UNIQUE,
//       password VARCHAR(255) NOT NULL
//   )`;



// }

module.exports = {pool};