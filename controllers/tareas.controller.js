const express = require("express");
const router = express.Router();
const tareasmodel = require("../models/tareas.model").tareasmodel;
const saludoMap = require("../models/tareas.model").saludoMap;
const dia = require("../models/tareas.model").dia;

async function obtener_saludo(req, res) {
  const min = 1;
  const max = 6;

  const randint = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const obtenerDia = new Date().getDay();

  const saludo = saludoMap[randint(min, max)];

  res.json({ saludo: saludo + dia[obtenerDia] });
}

async function listado_tareas(req, res) {
  const tareas = await tareasmodel.find();
  res.json(tareas);

  console.log(tareas);
}

async function crear_tarea(req, res) {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ message: "El nombre es requerido" });
  }

  const nuevaTarea = new tareasmodel({ nombre });
  await nuevaTarea.save();
  res.status(200).json({ message: "Tarea creada" });

  console.log(nombre);
}

async function eliminar_tarea(req, res) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "El ID es requerido" });
  }

  await tareasmodel.findByIdAndDelete(id);
  res.status(200).json({ message: "Tarea eliminada" });
  console.log(id);
}

async function concluir_tarea(req, res) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "El ID es requerido" });
  }

  await tareasmodel.findByIdAndUpdate(id, { estado: true });
  res.status(200).json({ message: "Tarea concluida" });
  console.log(id);
}

module.exports = {
  obtener_saludo,
  listado_tareas,
  crear_tarea,
  eliminar_tarea,
  concluir_tarea,
};
