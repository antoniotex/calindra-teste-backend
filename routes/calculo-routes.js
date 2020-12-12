const express = require('express')

const routes = express.Router()

// CALCULO ROUTES
routes.get('/calcula_distancia', (req, res) => {
    const { enderecos } = req.body
    res.send(enderecos)
})

module.exports = routes