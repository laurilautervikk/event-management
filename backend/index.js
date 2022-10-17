import express from "express";
import * as eventController from "./controllers/eventController.js";
import * as dotenv from "dotenv";
import YAML from "yamljs";
dotenv.config();
const port = process.env.PORT;

import swaggerUi from "swagger-ui-express";
const swaggerDocument = YAML.load("swagger.yaml");

const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Routes
app.get("/data", eventController.getData);

//serving public files
//app.use("/", express.static(path.join(__dirname, "../public")));

//serv static FE
// app.get("/", (req: any, res: any) => {
//   res.sendFile(path.join(__dirname, "../public/index.html"));
// });

app.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}`);
});
