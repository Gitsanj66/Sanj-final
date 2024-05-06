
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userContoller');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/refresh-token', userController.refreshToken);
router.post('/logout', userController.logoutUser);

module.exports = router;
