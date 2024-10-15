var express = require("express");
var router = express.Router();
const axios = require("axios");
const mongoose = require("mongoose");

const tareascontroller = require("../controllers/tareas.controller");

router.get("/obtener-saludo", tareascontroller.obtener_saludo);
router.get("/listado-tareas", tareascontroller.listado_tareas);
router.post("/crear-tarea", tareascontroller.crear_tarea);
router.post("/concluir-tarea", tareascontroller.concluir_tarea);
router.post("/eliminar-tarea", tareascontroller.eliminar_tarea);

module.exports = router;
