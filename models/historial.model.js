var express = require('express');
var router = express.Router();
const axios = require('axios');
const mongoose = require('mongoose');
const { MongoCryptKMSRequestNetworkTimeoutError } = require('mongodb');

const historialSchema = new mongoose.Schema({
    ganados: {
        type: Number,
        default: 0
        },
    perddidos: {
        type: Number,
        default: 0
        },
    historialUsuario: {
        type: [mongoose.Types.ObjectId],
        ref: 'Sesion'
        },  
    equipoElegido: {
        type: String,
        required: false
        }
    });