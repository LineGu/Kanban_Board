const express = require('express');
const router = express.Router();
const userDataController = require('../../controllers/user.js');

const { getUserDataForInit, getUserEmail, getUserId } = userDataController;

router.get('/', getUserDataForInit);

router.post('/email', getUserEmail);

router.post('/id', getUserId);

module.exports = router;
