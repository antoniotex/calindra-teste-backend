const apiGoogle = require('../services/apiGoogle')
const utils = require('../utils')
require('dotenv/config')

module.exports = {
    index: async (req, res) => {
        const { enderecos } = req.body

        if(enderecos.length)
            return res.status(400).send({ erro: 'Erro ao calcular distâncias', msg: 'É necessário 2 ou mais endereços para o cálculo de distância' }) 

        let calculos = { distancias: [] }

        try {
            for await (const endereco of enderecos){
                const response = await apiGoogle.get(`/json?key=${process.env.API_KEY_GOOGLE}&address=${utils.formatarEndereco(endereco.endereco)}`)

                if(response.data.status === 'REQUEST_DENIED')
                    return res.status(400).send({ erro: 'Erro ao calcular distâncias', msg: response.data.error_message }) 
                
                if(response.data.status === 'ZERO_RESULTS')
                    return res.status(400).send({ erro: 'Erro ao calcular distâncias', msg: 'Nenhum endereço foi encontrado' }) 

                endereco.geo = response.data.results[0].geometry.location
            }

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
            const distanciasOrdenadas = calculos.distancias.sort((a, b) => a.distancia - b.distancia)
            
            calculos.minDIstancia = distanciasOrdenadas[0]
            calculos.maxDIstancia = distanciasOrdenadas[distanciasOrdenadas.length - 1]
        
            res.send(calculos)

        } catch (error) {
            res.status(400).send({ erro: 'Erro ao calcular distâncias', msg: error.message })
        }
    }
}