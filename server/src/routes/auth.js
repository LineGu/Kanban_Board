const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.js');

const { logInWithLocal, logInWithSocial, logout } = authController;

router.post('/login', logInWithLocal);

router.post('/socialLogin', logInWithSocial);

router.get('/logout', logout);

module.exports = router;
