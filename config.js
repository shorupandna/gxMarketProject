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
                //MONGO_LOCAL_PATH: 'mongodb://localhost:27017/gxmarkets_mainnet',   //---local
                // MONGO_LOCAL_PATH: "mongodb://gxmm:gxmm270719@13.59.230.221:27017/gxmarkets",
                MONGO_SERVER_PATH: "mongodb://gxmm123:gxmm270819@13.59.230.221:27017/gxmarkets_mainnet", //--server  
                    APP_PORT: 3486,
                    mainnet_market: "0xffd7fbb7b8384d8c05647f4b094409135843cd0b"
            };
            break;
    }
};