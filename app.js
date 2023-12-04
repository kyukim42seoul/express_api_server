import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = 3232;

import userRoutes from "./routes/userRoutes.js";
app.use('/users', userRoutes);

import threadRoutes from "./routes/threadRoutes.js"
app.use('/threads', threadRoutes);

import validationRoutes from "./routes/validationRoutes.js";
app.use('/validate', validationRoutes);

app.listen(PORT, () => {
  console.log(`Server is running in ${PORT}`);
});
