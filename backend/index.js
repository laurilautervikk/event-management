import express from "express";
import router from "./routes/routes.js";
import { expressjwt } from "express-jwt";
import * as dotenv from "dotenv";
import YAML from "yamljs";
dotenv.config();
const port = process.env.PORT;
const SECRET = process.env.JWT_SECRET;
//import path from "path";

import swaggerUi from "swagger-ui-express";
const swaggerDocument = YAML.load("swagger.yaml");

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  expressjwt({ secret: SECRET, algorithms: ["HS256"] }).unless({
    path: [
      "/api-docs",
      "/users",
      "/sessions",
      { url: "/events", methods: ["GET"] },
    ],
  })
);

app.use("/", router);

//serving public files
// app.use("/", express.static(path.join(__dirname, "../public")));

//serv static FE
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/index.html"));
// });

app.use(function (err, req, res, next) {
  res.status(err.status || 500).send(err);
});

app.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}`);
});
