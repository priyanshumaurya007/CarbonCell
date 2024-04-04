const axios = require('axios');
const { Web3 } = require('web3');

const rpcURL = 'https://mainnet.infura.io/v3/aa174ee35fff40a3b0ae151ce75bc8b0';
const web3 = new Web3(rpcURL);

const fetchData = async (req, res) => {
    try {
        const { category, limit } = req.query;
        
        if (!category) {
            return res.status(400).json({ message: 'Category parameter is required.' });
        }

        let apiUrl = 'https://api.publicapis.org/entries';
        apiUrl += `?category=${category}`;

        const { data } = await axios.get(apiUrl);
        let filteredData = data.entries;

        if (!filteredData || filteredData.length === 0) {
            return res.status(404).json({ message: 'No data found for the specified category.' });
        }

        if (limit && !isNaN(limit)) {
            const limitNumber = parseInt(limit);
            filteredData = filteredData.slice(0, limitNumber);
        }

        res.status(200).json(filteredData);
    } catch (error) {
        if (error.response?.status === 400) {
            res.status(400).json({ message: 'Client API returned Bad request' });
        } else {
            res.status(500).json({ message: 'Internal server error.' });
        }
    }
};

const getEthereumBalance = async (req, res) => {
    try {
        const { address } = req.params;

        if (!address || !web3.utils.isAddress(address)) {
            return res.status(400).json({ message: 'Invalid Ethereum address.' });
        }

        const balance = await web3.eth.getBalance(address);
        const balanceInEther = web3.utils.fromWei(balance, 'ether');

        res.status(200).json({ address, balance: balanceInEther });
    } catch (error) {
        console.error('Error retrieving Ethereum account balance:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { fetchData, getEthereumBalance };
