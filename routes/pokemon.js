var express = require('express');
var router = express.Router();
const axios = require('axios');
const pokemonController = require('../controllers/pokemon.controller');

router.post('/select-pokes', pokemonController.seleccionarPokemon);

module.exports = router;
