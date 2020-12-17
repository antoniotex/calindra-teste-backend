# Desafio Backend Calindra

## Descrição do Projeto
O objetivo desta API é calcular a distância entre endereços, recebidos por parâmetro.

## Como utilizar
Segue abaixo o formato de requisição suportado pela API:
![image](https://user-images.githubusercontent.com/26071112/102423083-f297e180-3fe6-11eb-9e95-6b7101bd872d.png)

## Retorno esperado
```
{
    "distancias": [
        {
            "endereco1": {
                "endereco": "Beco da lapa, belford roxo, 26125563, rio de janeiro",
                "coordenadas": {
                    "lat": -22.7310725,
                    "lng": -43.4098189
                }
            },
            "endereco2": {
                "endereco": "Rua Tertuliano Pimenta, 491, Nova Iguaçu Rio de Janeiro",
                "coordenadas": {
                    "lat": -22.7565842,
                    "lng": -43.4700378
                }
            },
            "distancia": "6.8"
        },
        {
            "endereco1": {
                "endereco": "Avenida Paulo Guilguer Reimberg, 415, Parque Maria Fernandes, São Paulo",
                "coordenadas": {
                    "lat": -23.7706555,
                    "lng": -46.7136874
                }
            },
            "endereco2": {
                "endereco": "Rua Tertuliano Pimenta, 491, Nova Iguaçu Rio de Janeiro",
                "coordenadas": {
                    "lat": -22.7565842,
                    "lng": -43.4700378
                }
            },
            "distancia": "348.8"
        },
        {
            "endereco1": {
                "endereco": "Avenida Paulo Guilguer Reimberg, 415, Parque Maria Fernandes, São Paulo",
                "coordenadas": {
                    "lat": -23.7706555,
                    "lng": -46.7136874
                }
            },
            "endereco2": {
                "endereco": "Beco da lapa, belford roxo, 26125563, rio de janeiro",
                "coordenadas": {
                    "lat": -22.7310725,
                    "lng": -43.4098189
                }
            },
            "distancia": "355.5"
        }
    ],
    "minDIstancia": {
        "endereco1": {
            "endereco": "Beco da lapa, belford roxo, 26125563, rio de janeiro",
            "coordenadas": {
                "lat": -22.7310725,
                "lng": -43.4098189
            }
        },
        "endereco2": {
            "endereco": "Rua Tertuliano Pimenta, 491, Nova Iguaçu Rio de Janeiro",
            "coordenadas": {
                "lat": -22.7565842,
                "lng": -43.4700378
            }
        },
        "distancia": "6.8"
    },
    "maxDIstancia": {
        "endereco1": {
            "endereco": "Avenida Paulo Guilguer Reimberg, 415, Parque Maria Fernandes, São Paulo",
            "coordenadas": {
                "lat": -23.7706555,
                "lng": -46.7136874
            }
        },
        "endereco2": {
            "endereco": "Beco da lapa, belford roxo, 26125563, rio de janeiro",
            "coordenadas": {
                "lat": -22.7310725,
                "lng": -43.4098189
            }
        },
        "distancia": "355.5"
    }
}
``` 

## Tecnologias
+ Javascript
    + [Node](https://nodejs.org/en/)
+ API
    + [API Geocode do Google](https://developers.google.com/maps/documentation/geocoding/start)
+ Bibliotecas
    + [axios](https://github.com/axios/axios)

## Executar o projeto
### Local
Para executar o projeto em modo de desenvolvimento, você deverá ter pelo menos a última versão estável do [Node.js](https://nodejs.org/en/download/) instalado em sua máquina.

Clone o repositório digitando no seu terminal
```
git clone https://github.com/antoniotex/calindra-teste-backend.git
```

Após terminar o download, acesse a pasta e instale as depêndencias
```
cd calindra-teste-backend
npm install
```

Quando terminar de instalar as depêndencias, inicie o servidor de desenvolvimento
```
npm run dev
```
Acesse o endereço abaixo no seu navegador para visualizar
```
http://localhost:5000/api-docs


```

### Na internet
```
https://desafio-calindra-backend.herokuapp.com/calcula_distancia
``` 

