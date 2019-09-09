/** 
 *
 * @module      :: Route Index
 * @description :: Routing for all the API's
 * @author      :: Saileela Puvvada
 */
var router = require('express').Router();
require('./gxmarkets').route(router); //routes
require('./gxmmauto').route(router);
module.exports = router;

