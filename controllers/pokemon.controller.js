var express = require('express');
var router = express.Router();
const axios = require('axios');
const mongoose = require('mongoose');
const { MongoCryptKMSRequestNetworkTimeoutError } = require('mongodb');

const typeMap = require('../models/pokemon.model').typeMap;
const pokemonSchema = require('../models/pokemon.model').pokemonSchema;
const types = require('../models/pokemon.model').types;


async function seleccionarPokemon(req, res) {
    const player1Choice = req.body.player1Choice;
        const userSession = req.userSession;

    const player1Pokemon = await getRandomPokemonByType(typeMap[player1Choice]);
    const player2Type = types[Math.floor(Math.random() * types.length)];
    const player2Pokemon = await getRandomPokemonByType(typeMap[player2Type]);

    let resultado;
    if (player1Choice === player2Type) {
      resultado = "Empate";
    } else if (
      (player1Choice === "fire" && player2Type === "grass") ||
      (player1Choice === "water" && player2Type === "fire") ||
      (player1Choice === "grass" && player2Type === "water")
    ) {
      resultado = "Ganaste";
    } else {
      resultado = "Perdiste";
    }
  
  
      if (userSession) {
        //actualizar el historial y resultados
        userSession.historialUsuario.push(player1Choice);
        userSession.historialCPU.push(player2Type);
  
        if (resultado === "Ganaste") {
          userSession.ganados += 1;
        } else if (resultado === "Perdiste") {
          userSession.perdidos += 1;
        }
  
        //guardar la sesion actualizada
        await userSession.save();
  
        res.json({
          player1: player1Pokemon,
          tipoPlayer1: player1Choice,  
          player2: player2Pokemon,
          tipoPlayer2: player2Type, 
          resultado: resultado,
          historial: {
            usuario: userSession.historialUsuario,
            cpu: userSession.historialCPU
          },
          sesion: {
            ganados: userSession.ganados,
            perdidos: userSession.perdidos
          }
        });
      } else {
        res.status(404).json({ message: "Usuario no encontrado" });
      }
    }


async function getRandomPokemonByType(typeId) {
        const url = "https://pokeapi.co/api/v2/type/" + typeId;
        const response = await axios.get(url);
        const filteredPokemonList = response.data.pokemon;
      
        const pokeIndex = Math.floor(Math.random() * filteredPokemonList.length);
        const pokemonChosen = filteredPokemonList[pokeIndex].pokemon;
        const pokemonNumber = pokemonChosen.url.split("/")[6];
        const spriteImage = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemonNumber + ".png";
        const pokemonName = pokemonChosen.name;
      
        return { name: pokemonName, image: spriteImage };
      }
module.exports = { seleccionarPokemon, getRandomPokemonByType };