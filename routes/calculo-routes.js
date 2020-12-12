const { default: Axios } = require('axios')
const express = require('express')
const axios = require('axios')
require('dotenv/config')

const routes = express.Router()
const apiGoogle = `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.API_KEY_GOOGLE}`

async function obterGeolocalizacao(enderecos){
    for await (let endereco of enderecos){
        try {
            await axios.get(`${apiGoogle}&address=${item}`)
                .then((result) => {
                    endereco.geo = result.data.results[0].geometry.location
                })
        } catch (error) {
            console.log(error)
        }
    }
    return enderecos
}

// CALCULO ROUTES
routes.get('/calcula_distancia', async (req, res) => {
    const result = await obterGeolocalizacao(req.body.enderecos)

    

    res.send(result)
})

module.exports = routes