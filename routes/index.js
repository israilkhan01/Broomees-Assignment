const express = require('express');
const userHandler  =  require('../controllers/UserController');
const router = express.Router();
router.get("/",userHandler.signIn)

module.exports = router;