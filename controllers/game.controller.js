var express = require('express');
var router = express.Router();
const axios = require('axios');
const mongoose = require('mongoose');
const { MongoCryptKMSRequestNetworkTimeoutError } = require('mongodb');

const sesionmodel = require('../models/game.model').sesionModel;

async function regresarPartida (req, res) {
    const username = req.query.username;
  
    //validar que el nombre de usuario no sea vacio
    if (username===undefined||username==="") {
      return res.status(400).json({ message: "El username es requerido" });
    }
  
    try {
      //buscar la sesion por nombre de usuario
      const userSession = await sesionmodel.findOne({ username });
  
      if (userSession) {
        res.status(200).json({ infoPartida: userSession });
      } else {
        //crear una nueva sesion si no existe
        const newSession = new sesionmodel({
          username: username
        });
        await newSession.save(); //guardar la nueva sesion
        res.status(200).json({ infoPartida: newSession });
      }
  
    } catch (error) {
      console.log(error);
      res.status(500).send("Error al buscar la sesión");
    }
  }

  async function historial(req, res) {
    const username = req.query.username;
    console.log(username);
    //validar que el nombre de usuario no sea vacio
    if (username===undefined||username==="") {
      return res.status(400).json({ message: "El username es requerido" });
    }
  
    try {
      //buscar la sesion por nombre de usuario
      const userSession = await sesionmodel.findOne({ username });
  
      if (userSession) {
        res.status(200).json({ historial: userSession.historialUsuario, ganados: userSession.ganados, perdidos: userSession.perdidos });
      } else {
        res.status(404).json({ message: "Usuario no encontrado" });
      }
  
    } catch (error) {
      console.log(error);
      res.status(500).send("Error al buscar la sesión");
    }
  }
  async function validateUser(req, res, next) {
    const { username } = req.body;
    const userSession = await sesionmodel.findOne({ username });

  
    if (userSession) {
      req.userSession = userSession;
      next();
    }
    else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  }

module.exports = { regresarPartida, historial, validateUser };