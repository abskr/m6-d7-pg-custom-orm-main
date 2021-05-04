const route = require("express").Router();
const Model = require("../../db/Model");
const db = require("../../db");
const Modules = new Model("modules");
const StudentModules = new Model("student_modules");
const TutorModules = new Model("tutor_modules")

route.get("/", async (req, res, next) => {
  try {
    const response = await Modules.find(req.query);
    res.send(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

route.get("/:id", async (req, res, next) => {
  try {
    const response = await Modules.findById({
      id: { name: "module_id", value: req.params.id },
    });
    res.send(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

route.get("/:id/students", async (req, res, next) => {
  try {
    const queryText = `
    SELECT 
    relation.student_id,relation.module_id ,relation.relation_id as relation_id,
    student.name as student_name,student.lastname as student_lastname,student.student_id,
    module.name as module_name,module.module_id
    FROM public.student_modules as relation
    INNER JOIN public.students as student ON student.student_id = relation.student_id 
    INNER JOIN public.modules as module ON module.module_id = relation.module_id
    ;
    `;
    const { rows } = await db.query(queryText);
    res.send(rows);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

route.get("/:id/tutors", async (req, res, next) => {
  try {
    const queryText = `
    SELECT 
    relation.tutor_id,relation.module_id ,relation.relation_id as relation_id,

    tutor.name as tutor_name,tutor.lastname as tutor_lastname,tutor.tutor_id,
    
    module.name as module_name,module.module_id

    FROM public.tutor_modules as relation

    INNER JOIN public.tutors as tutor ON tutor.tutor_id = relation.tutor_id 
    INNER JOIN public.modules as module ON module.module_id = relation.module_id
    ;
    `;
    const {
      rows
    } = await db.query(queryText);
    res.send(rows);
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
});

route.post("/", async (req, res, next) => {
  try {
    const response = await Modules.create(req.body);
    res.send(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

route.post("/:id/student/:studentid", async (req, res, next) => {
  try {
    const response = await StudentModules.create({
      module_id: req.params.id,
      student_id: req.params.studentid,
    });
    res.send(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

route.post("/:id/tutor/:tutorid", async (req, res, next) => {
  try {
    const response = await TutorModules.create({
      module_id: req.params.id,
      tutor_id: req.params.tutorid,
    });
    res.send(response);
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
});

route.delete("/student/:relationId", async (req, res, next) => {
  try {
    const response = await StudentModules.findByIdAndDelete({
      name: "relation_id",
      value: req.params.relationId,
    });
    res.send(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

route.delete("/tutor/:relationId", async (req, res, next) => {
  try {
    const response = await TutorModules.findByIdAndDelete({
      name: "relation_id",
      value: req.params.relationId,
    });
    res.send(response);
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
});

route.put("/:id", async (req, res, next) => {
  try {
    const response = await Modules.findByIdAndUpdate(
      { name: "module_id", value: req.params.id },
      req.body
    );
    res.send(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

route.delete("/:id", async (req, res, next) => {
  try {
    const response = await Modules.findByIdAndDelete({
      name: "module_id",
      value: req.params.id,
    });
    res.send(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = route;
