var express = require('express');
var router = express.Router();
const axios = require('axios');
const mongoose = require('mongoose');
const { MongoCryptKMSRequestNetworkTimeoutError } = require('mongodb');

const pokemonSchema = new mongoose.Schema({
    fire: {
      type: String,
      required: true
    },
    water: {
      type: String,
      required: true
    },
    grass: {
      type: String,
      required: true
    }
  });

const typeMap = {
    "fire": 10, 
    "water": 11, 
    "grass": 12  
  };
  
  const types = ["fire", "water", "grass"];
  

module.exports = {
    pokemonSchema,
    typeMap,
    types
};
  