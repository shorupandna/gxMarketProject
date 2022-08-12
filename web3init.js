const Web3 = require('web3');

let endpoint;
if (process.env.NODE_ENV === 'production') {
    endpoint = 'https://mainnet.infura.io/v3/8b2d98b08efb4b0ca12e3ca7653d54b1';
} else {
    // endpoint = 'https://mainnet.infura.io/v3/8b2d98b08efb4b0ca12e3ca7653d54b1';
    endpoint = 'https://ropsten.infura.io/v3/d40fef3535244522b72e286039b8705b';
}

module.exports = function () {
    return new Web3(new Web3.providers.HttpProvider(endpoint))
}