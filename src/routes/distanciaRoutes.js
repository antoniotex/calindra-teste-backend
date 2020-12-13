const express = require('express')
const distanciaController = require('../controller/distanciaController')
const apiGoogle = require('../services/apiGoogle')
const utils = require('../utils')
require('dotenv/config')

const routes = express.Router()

// CALCULO ROUTES
routes.get('/calcula_distancia', distanciaController.index)

module.exports = routes