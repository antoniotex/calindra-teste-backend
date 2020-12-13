const axios = require('axios');

const apiGoogle = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/geocode'
});

module.exports = apiGoogle;