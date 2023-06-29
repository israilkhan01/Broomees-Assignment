const fs = require('fs');
const path = require('path');
const {pool} = require("../config/db")
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
        console.log("results: " + selectQuery);
        const [rows] = await pool.query(selectQuery);
        console.log("rows: " + rows[0]);
        res.json(200,{
        message:'request successful',
        data:{
            result:rows
        }})
   } catch (error) {
    
   }
    // pool.getConnection(function(err,connection){
    //     connection.query(selectQuery, (err, result)  => {
    //         if (err) {
    //             throw err;
    //         }
    
    //         console.log('User feteched successfully');
    //         res.json(200,{
    //             message:'request successful',
    //             data:{
    //                 result:result
    //             }})
    //     })
    // })
}

module.exports.signUp =async function (req, res) {
    try{
        const { firstname, lastname,email, username, password } = req.body;
        const insertQuery = 'INSERT INTO USERS (firstname, lastname,email, username, password) VALUES (?, ?, ?,?, ?)';
        const selectByEmail = 'SELECT * FROM USERS where email = ?'
        const values = [firstname,lastname ,email ,username ,password];
        // console.log(values);
        const [rows] = await pool.query(selectByEmail,[email]);
        console.log("rows zrerop--",rows)
        if(rows.length==0){
            const [result] = await pool.query(insertQuery,values);
            console.log(result)
            res.status(201).json({ message: 'User created successfully' });
        }else{
             res.send("User already exists")
        }
    }catch(error){
        res.send(error);   
    }
}