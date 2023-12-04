import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.get('/', (req, res) => {
	res.status(200).send('GET /users');
});

router.post('/', userController.createUser);
router.post('/login', userController.login);
router.post('/authenticate', userController.authenticateUser);

export default router;