import express from "express";
import apiRouter from "./routes/apiRoutes.js";
import * as dotenv from "dotenv";
import YAML from "yamljs";
dotenv.config();
const port = process.env.PORT;

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: "json" };
//const swaggerDocument = YAML.load("swagger-config.yaml");
//const swaggerJsonDocument = require("./swagger.json");

const app = express();
app.use(express.json());
app.use("/api", apiRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//serving public files
//app.use("/", express.static(path.join(__dirname, "../public")));

//serv static FE
// app.get("/", (req: any, res: any) => {
//   res.sendFile(path.join(__dirname, "../public/index.html"));
// });

app.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}`);
});
