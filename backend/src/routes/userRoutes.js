const express = require('express');
const router = express.Router();
const {getAllUsers} = require('../controllers/userController.js');
const {authMiddleware} = require('../middlewares/authMiddleware.js');


router.get('/', authMiddleware(), getAllUsers);


module.exports = router;