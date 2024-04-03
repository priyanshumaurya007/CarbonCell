const axios = require('axios');
const { response } = require('express');

const { Web3 } = require('web3');
const rpcURL = 'https://mainnet.infura.io/v3/aa174ee35fff40a3b0ae151ce75bc8b0';
const web3 = new Web3(rpcURL);



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

const ethereumBalance = async ( req, res ) => {
    try {
        const { address } = req.params;

        if (!web3.utils.isAddress(address)) {
            return res.status(400).json({ message: 'Invalid Ethereum address.' });
        }

        const balance = await web3.eth.getBalance(address);

        const balanceInEther = web3.utils.fromWei(balance, 'ether');

        res.status(200).json({ address, balance: balanceInEther });
    } catch (error) {
        console.error('Error retrieving Ethereum account balance:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}
module.exports = {fetchData, ethereumBalance};