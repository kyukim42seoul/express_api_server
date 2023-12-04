import express from "express";
import userController from "../controllers/userController.js";

//const express = require('express');
const router = express.Router();
//const userController = require('../controllers/userController');

router.get('/', (req, res) => {
	res.status(200).send('GET /users');
});

router.post('/', userController.createUser);
router.post('/authenticate', userController.authenticateUser);

//module.exports = router;

export default router;