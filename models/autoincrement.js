/**
 * autoincrement
 *
 * @module      :: Model
 * @description :: Represent data model for the autoincrement id's
 * @author      :: saileela Puvvada
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AutoIncrementSchema = new Schema({
    uuid: {
        type: Number
    },
    pid: {
        type: Number
    }
});


module.exports = mongoose.model('AutoIncrement', AutoIncrementSchema);



