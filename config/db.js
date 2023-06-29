const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: 'localhost',
//   user:'root',
//   password:'root',
// }).promise()

const pool =  mysql.createPool({
  host:'sql12.freesqldatabase.com',
  user:'sql12629303',
  password:'nx6cfRjCbM',
  database:'sql12629303',
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
// pool.getConnection((error,connection) => {
//   if (error) {
//     console.error('Error connecting to the database:', error);
//   } else {
//     connection.query('SELECT * FROM users', (error, results) => {
//       // connection.release(); // Release the connection

//       if (error) {
//         throw error;
//       }
//       console.log(results)
//     })
      
//     console.log('Connected to the database');
//   }
// });

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