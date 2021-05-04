const express = require("express");

const cors = require("cors");

const app = express();

const port = process.env.PORT || 5000;

const services = require("./services");
const listEndpoints = require("express-list-endpoints");

app.use(cors());

app.use(express.json());

app.use("/api", services);

console.log(listEndpoints(app))
app.listen(port, () => console.info(" 🚀 Server is running: ", port));

app.on("error", (error) =>
  console.info(" ❌ Server is not running due to : ", error)
);