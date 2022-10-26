import express from "express";
//import mongoose from "mongoose";
import userRouter from "./routes/userRoutes.js";
import eventRouter from "./routes/eventRoutes.js";
import * as dotenv from "dotenv";
import YAML from "yamljs";
dotenv.config();
const port = process.env.PORT;
//import path from "path";

import swaggerUi from "swagger-ui-express";
const swaggerDocument = YAML.load("swagger.yaml");

const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/user", userRouter);
app.use("/event", eventRouter);

//serving public files
// app.use("/", express.static(path.join(__dirname, "../public")));

//serv static FE
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/index.html"));
// });

app.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}`);
});
