var express = require("express");
var router = express.Router();
const axios = require("axios");
const mongoose = require("mongoose");
const { MongoCryptKMSRequestNetworkTimeoutError } = require("mongodb");

const tareaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  estado: {
    type: Boolean,
    default: false,
  },
});

const saludoMap = {
  1: "Bienvenido de vuelta! Hoy es: ",
  2: "Ya es hora de trabajar este: ",
  3: "Hola, ¿cómo estás este: ",
  4: "A darle con todo hoy: ",
  5: "Otro día más, vamos: ",
  6: "Productivo día de: ",
};

const dia = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

const tareasmodel = mongoose.model("Tarea", tareaSchema);

module.exports = {
  tareasmodel,
  saludoMap,
  dia,
};
