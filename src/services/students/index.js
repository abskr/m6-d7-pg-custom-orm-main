const route = require("express").Router();
const Model = require("../../db/Model");

const Students = new Model("students");

route.get("/", async (req, res, next) => {
  try {
    const response = await Students.find(req.query);
    res.send(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

route.get("/:id", async (req, res, next) => {
  try {
    const response = await Students.findById({
      id: { name: "student_id", value: req.params.id },
    });
    res.send(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

route.post("/", async (req, res, next) => {
  try {
    const response = await Students.create(req.body);
    res.send(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

route.put("/:id", async (req, res, next) => {
  try {
    const response = await Students.findByIdAndUpdate(
      { name: "student_id", value: req.params.id },
      req.body
    );
    res.send(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

route.delete("/:id", async (req, res, next) => {
  try {
    const response = await Students.findByIdAndDelete({
      name: "student_id",
      value: req.params.id,
    });
    res.send(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = route;
