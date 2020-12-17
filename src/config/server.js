const express = require('express')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const distanciaController = require('../controller/distanciaController')

const app = express()

const routes = require('../routes/distanciaRoutes')


const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Cálculo de Distância API',
            version: '1.0.0',
            description: 'API para cálculo de distância entre endereços',
            contact: {
                name: 'Antonio Carlos'
            },
            servers: ['http://localhost:5000']
        }
    },
    apis: ["src/routes/*.js"]
}
const swaggerDocs = swaggerJsDoc(swaggerOptions)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(express.json())

app.use(routes)

module.exports = app