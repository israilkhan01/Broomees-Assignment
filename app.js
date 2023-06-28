const express = require('express');
const app = express();
// const router = express.router();
const PORT = 3000;

app.use(express.urlencoded())
app.use(express.static("./assets/"))
app.set('view engine','ejs');
app.set('views','./views');
app.use("/",require("./routes"));
app.listen(PORT,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on Port : ${PORT}`)
});