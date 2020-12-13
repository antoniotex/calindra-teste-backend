const apiGoogle = require('../services/apiGoogle')
const utils = require('../utils')
require('dotenv/config')

module.exports = {
    index: async (req, res) => {
        const { enderecos } = req.body

        for await (const endereco of enderecos){
            try {
                await apiGoogle.get(`/json?key=${process.env.API_KEY_GOOGLE}&address=${utils.formatarEndereco(endereco.endereco)}`)
                    .then((result) => {
                        console.log('result', result.data)
                        endereco.geo = result.data.results[0].geometry.location
                    }).catch((err) => {
                        console.log(err)
                    });
    
            } catch (error) {
                console.log(error)
            }
        }

        let calculos = {distancias: []}
    
        for (let i = 0; i < enderecos.length; i++) {
            for (let j = i + 1; j < enderecos.length; j++) {
                const distancia = utils.calcularDistancia(enderecos[i].geo, enderecos[j].geo)
                
                calculos.distancias.push({
                    endereco1: {
                        endereco: enderecos[i].endereco,
                        coordenadas: enderecos[i].geo
                    },
                    endereco2: {
                        endereco: enderecos[j].endereco,
                        coordenadas: enderecos[j].geo
                    },
                    distancia: utils.converterMetroKM(distancia)
                })
            }
        }   
        const ordenada = calculos.distancias.sort((a, b) => a.distancia - b.distancia)
        
        calculos.minDIstancia = ordenada[0]
        calculos.maxDIstancia = ordenada[ordenada.length - 1]
    
        res.send(calculos)
    }
}