const route = require("express").Router();
const Model = require("../../db/Model");
const db = require("../../db");
const Tutors = new Model("tutors");

route.get("/", async (req, res, next) => {
  try {
    const response = await Tutors.find(req.query);
    res.send(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

route.get("/stats", async (req, res, next) => {
  try {
    const { countBy, value } = req.query;
    const queryText = `SELECT COUNT(tutor.${countBy}) AS count,tutor.${countBy} FROM public.tutors as tutor WHERE tutor.${countBy}='${value}' GROUP BY tutor.${countBy}`;
    const { rows } = await db.query(queryText);
    res.send(rows);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

route.get("/:id", async (req, res, next) => {
  try {
    const response = await Tutors.findById({
      id: { name: "tutor_id", value: req.params.id },
    });
    res.send(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

route.post("/", async (req, res, next) => {
  try {
    const response = await Tutors.create(req.body);
    res.send(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

route.put("/:id", async (req, res, next) => {
  try {
    const response = await Tutors.findByIdAndUpdate(
      { name: "tutor_id", value: req.params.id },
      req.body
    );
    res.send(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

route.delete("/:id", async (req, res, next) => {
  try {
    const response = await Tutors.findByIdAndDelete({
      name: "tutor_id",
      value: req.params.id,
    });
    res.send(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = route;
