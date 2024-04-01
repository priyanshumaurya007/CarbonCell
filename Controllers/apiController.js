const axios = require('axios');
const { response } = require('express');


const fetchData = async (req, res) => {
    try {

        const { category, limit } = req.query;
        
        let apiUrl = 'https://api.publicapis.org/entries';

        if(category) {
            apiUrl += `?category=${category}`;
        }

        const response = await axios.get(apiUrl);
        let filteredData = response.data.entries;

        if (limit && !isNaN(limit)) {
            const limitNumber = parseInt(limit);
            filteredData = filteredData.slice(0, limitNumber);
        }

        res.status(200).json(filteredData);
    } catch (error) {
        if(error.response?.status == 400) {
            res.status(400).json({message: `Client API returned Bad request`});
        }

        res.status(500).json({ message: 'Internal server error.' });
    }

}

module.exports = {fetchData};