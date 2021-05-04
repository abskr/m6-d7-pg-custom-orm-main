const route = require("express").Router();

const studentsRoute = require("./students");
const tutorsRoute = require("./tutors");
const modulesRoute = require("./modules");

route.use("/tutors", tutorsRoute);
route.use("/modules", modulesRoute);
route.use("/students", studentsRoute);

module.exports = route;
