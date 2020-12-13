const express = require('express')
const apiGoogle = require('../services/apiGoogle')
require('dotenv/config')

const routes = express.Router()

function formatarEndereco(endereco){
    let map={"â":"a","Â":"A","à":"a","À":"A","á":"a","Á":"A","ã":"a","Ã":"A","ê":"e","Ê":"E","è":"e","È":"E","é":"e","É":"E","î":"i","Î":"I","ì":"i","Ì":"I","í":"i","Í":"I","õ":"o","Õ":"O","ô":"o","Ô":"O","ò":"o","Ò":"O","ó":"o","Ó":"O","ü":"u","Ü":"U","û":"u","Û":"U","ú":"u","Ú":"U","ù":"u","Ù":"U","ç":"c","Ç":"C"};

    let enderecoFormatado = endereco.replace(/[\W\[\] ]/g,function(a){return map[a]||a})

    return enderecoFormatado.replace(/\s/g, '+')
}

async function obterGeolocalizacao(enderecos){
    for await (const endereco of enderecos){
        const formatado = formatarEndereco(endereco.endereco)
        try {
            await axios.get(`${apiGoogle}&address=${formatado}`)
                .then((result) => {
                    endereco.geo = result.data.results[0].geometry.location
                })
        } catch (error) {
            return error
            console.log(error)
        }
    }
    return enderecos
}

function obterDistancia(endereco1, endereco2) {
    var deg2rad = function (deg) { return deg * (Math.PI / 180); },
        R = 6371,
        dLat = deg2rad(endereco2.lat - endereco1.lat),
        dLng = deg2rad(endereco2.lng - endereco1.lng),
        a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
            + Math.cos(deg2rad(endereco1.lat))
            * Math.cos(deg2rad(endereco1.lat))
            * Math.sin(dLng / 2) * Math.sin(dLng / 2),
        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return ((R * c *1000).toFixed());
}

// CALCULO ROUTES
routes.get('/calcula_distancia', async (req, res) => {
    const result = await obterGeolocalizacao(req.body.enderecos)
    let calculos = {distancias: []}

    for (let i = 0; i < result.length; i++) {
        for (let j = i + 1; j < result.length; j++) {
            const distancia = obterDistancia(result[i].geo, result[j].geo)
            
            calculos.distancias.push({
                endereco1: {
                    endereco: result[i].endereco,
                    coordenadas: result[i].geo
                },
                endereco2: {
                    endereco: result[j].endereco,
                    coordenadas: result[j].geo
                },
                distancia: distancia
            })
        }
        
    }

    const ordenada = await calculos.distancias.sort((a, b) => a.distancia - b.distancia)
    calculos.minDIstancia = ordenada[0]
    calculos.maxDIstancia = ordenada[ordenada.length - 1]

    console.log(calculos.maxDIstancia)

    res.send(calculos)
})

module.exports = routes