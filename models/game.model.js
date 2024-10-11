var express = require('express');
var router = express.Router();
const axios = require('axios');
const mongoose = require('mongoose');
const { MongoCryptKMSRequestNetworkTimeoutError } = require('mongodb');
const pokemonSchema= require('./pokemon.model').pokemonSchema;


const sesionSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    ganados: {
      type: Number,
      default: 0
    },
    perdidos: {
      type: Number,
      default: 0
    },
    historialUsuario: {
      type: Array,
      default: []
    },
    historialCPU: {
      type: Array,
      default: []
    },
    equipoElegido: {
      type: pokemonSchema,
      required: false
    }
  });
  
  const sesionModel = mongoose.model('Sesion', sesionSchema);

module.exports={
    sesionModel
}