import express from "express";
import threadController from "../controllers/threadController.js";

const router = express.Router();

router.get('/', (req, res) => {
	res.status(200).send('GET /threads');
});

router.post('/', threadController.createThread);

export default router;