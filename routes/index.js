const express = require('express');
const userHandler  =  require('../controllers/UserController');
const router = express.Router();
router.get("/",userHandler.home)
router.get("/results",userHandler.results)
router.post("/create-user",userHandler.signUp)

module.exports = router;