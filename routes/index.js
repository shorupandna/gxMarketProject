/** 
 *
 * @module      :: Route Index
 * @description :: Routing for all the API's
 * @author      :: Saileela Puvvada
 */
var router = require('express').Router();
require('./gxmarkets').route(router); 
module.exports = router;

