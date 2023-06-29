const fs = require('fs');
const path = require('path');
const {pool} = require("../config/db")

const bcrypt = require('bcrypt');

module.exports.home = function (req, res) {
    try {

        res.render('home', {
            title: "SIGN IN .."
        })
    } catch (err) {
        console.error(err);
    }
}

module.exports.results =async function(req,res){
   try {
        const selectQuery =  "SELECT * FROM USERS";
        const deleteQuery = "DELETE FROM USERS";
        console.log("results: " + selectQuery);
        // await pool.query(deleteQuery)   - just to manually delete
        const [rows] = await pool.query(selectQuery);
        console.log("rows: " + rows[0]);
        res.status(200).json({
            message:'request successful',
            data:{
                result:rows
            }})
   } catch (error) {
    
   }
}

module.exports.signUp =async function (req, res) {
    try{
        const { firstname, lastname,email, username, password } = req.body;
        const insertQuery = 'INSERT INTO USERS (firstname, lastname,email, username, password) VALUES (?, ?, ?,?, ?)';
        const selectByEmail = 'SELECT * FROM USERS where email = ?'
        const fetchById = 'SELECT * FROM USERS WHERE ID = ?';

        const values = [firstname,lastname ,email ,username ,password];
        // console.log(values);
        const [rows] = await pool.query(selectByEmail,[email]);
        // console.log("rows zrerop--",rows)
        if(rows.length==0 ){
            const [result] = await pool.query(insertQuery,values);
            const [row] = await pool.query(fetchById,[result.insertId]);
            return res.send({
                success: `Data inserted successfully with id ${result.insertId}`,
                results:row[0]
            });
              console.log(result.insertId)
        }else{
            //  res.status().send("User already exists")
             res.send({ error: 'User already exists' });
             return res.redirect('/results');
        }
    }catch(error){
        res.send(error);   
    }
}