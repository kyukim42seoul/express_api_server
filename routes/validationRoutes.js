import express from "express";
import validationController from "../controllers/validationController.js";

const router = express.Router();

router.get('/validate/email', validationController.validateEmail);

export default router;