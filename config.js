/* 
 *  Configuration
 * @module      :: Model
 * @description :: Represent data for the Default Configuration
 * @Note        :: Make sure while pushing to server change MONGO_SERVER_PATH with server url
 * @author      :: saileela puvvada
 */

module.exports = function () {
    switch (process.env.NODE_ENV) {
        default:
        case 'dev':
            return {
                MONGO_SERVER_PATH: 'mongodb://localhost:27017/gxmarkets_mainnet',   //---local
                MONGO_SERVER_PATH: "mongodb://gxmm123:gxmm270819@13.59.230.221:27017/gxmarkets_mainnet",   //--server  
                APP_PORT: 3486,
                cryptocompare: 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BAT,DAI,ETH,REP,USDC,ZRX&tsyms=USD',
                ccxtcompare: 'http://3.16.168.61:80/ccxt/compare/multiplePrice?fsyms=BAT,DAI,ETH,REP,USDC,ZRX&tsyms=USD',
                PRODUCTION: 'https://mainnet.infura.io/v3/8b2d98b08efb4b0ca12e3ca7653d54b1',
                mainnet_addresses: [
                    '0x0D8775F648430679A709E98d2b0Cb6250d2887EF',
                    '0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359',
                    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
                    '0x1985365e9f78359a9B6AD760e32412f4a445E862',
                    '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
                    '0xE41d2489571d322189246DaFA5ebDe1F4699F498',
                    '0x60c87297a1feadc3c25993ffcadc54e99971e307'
                ],
                rinkeby_addresses: [
                    '0xbf7a7169562078c96f0ec1a8afd6ae50f12e5a99',
                    '0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa',
                    '0xc778417E063141139Fce010982780140Aa0cD5Ab',
                    '0x6e894660985207feb7cf89Faf048998c71E8EE89',
                    '0x4dbcdf9b62e891a7cec5a2568c3f4faf9e8abe2b',
                    '0xddea378A6dDC8AfeC82C36E9b0078826bf9e68B6',
                    '0xb552c78e84F684fD3Cd8Dd97D73FF9d006d991a0'
                ]
            };
            break;
    }
};