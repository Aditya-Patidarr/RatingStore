const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');
const { validateSignup, validateLogin } = require('../utils/validations.js');
const {authMiddleware} = require('../middlewares/authMiddleware.js');


router.get('/current-user',authMiddleware(),authController.getCurrentUser);
router.post('/signup', validateSignup, authController.signup);

router.post('/login', validateLogin, authController.login);
router.get('/logout', validateLogin, authController.logout);
router.put('/update-password', authMiddleware(), authController.updatePassword);

module.exports = router;