import express from "express";
import threadController from "../controllers/threadController.js";

const router = express.Router();

router.get("/", threadController.getThread);

router.post('/', threadController.createThread);

export default router;