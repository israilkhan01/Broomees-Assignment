const fs = require('fs');
const path = require('path');

module.exports.signIn = function (req, res, next) {
    try {

        res.render('home',{
            title:"SIGN IN .."
        })
    }catch(err){
        console.error(err);
    }
}