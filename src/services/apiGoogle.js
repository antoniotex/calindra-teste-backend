const axios = require('axios');

require('dotenv/config')

const apiGoogle = axios.create({
    baseURL: `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.API_KEY_GOOGLE}`
});

module.exports = apiGoogle;