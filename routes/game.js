var express = require('express');
var router = express.Router();
const axios = require('axios');
const mongoose = require('mongoose');
const { MongoCryptKMSRequestNetworkTimeoutError } = require('mongodb');
const gameController = require('../controllers/game.controller'); 
const pokemonController= require('../controllers/pokemon.controller');


router.post('/validate-user', gameController.validateUser,pokemonController.seleccionarPokemon);
router.get('/regresar-partida', gameController.regresarPartida);
router.get('/historial', gameController.historial);



 

    
module.exports = router;
