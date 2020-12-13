const express = require('express')
const distanciaController = require('../controller/distanciaController')
require('dotenv/config')

const routes = express.Router()

/**
 * @swagger
 * definitions:
 *  Enderecos:
 *   type: object
 *   properties:
 *    enderecos:
 *     type: array
 *     items:
 *      type: object
 *      properties:
 *       endereco:
 *        type: string
 *        example: 'Avenida Paulo Guilguer Reimberg, 415, Jardim Maria Fernandes, São Paulo'
 */

/**
* @swagger
* /calcula_distancia:
*  post:
*   summary: Calcular distância
*   description: Rota para calcular a distância entre os endereços recebidos por parâmetro
*   requestBody:
*    content:
*     appplication/json:
*      schema:
*       $ref: '#definitions/Enderecos'
*   responses:
*    '200':
*     description: Cálculo de distância efetuado com sucesso
*    '400':
*     description: Falha ao efetuar cálculo de distância
*/
routes.post('/calcula_distancia', distanciaController.index)

module.exports = routes