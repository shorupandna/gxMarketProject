/*
 * apr_data model
 * author: saileela puvvada
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var aprDataSchema = new Schema({

    market_name: {
        type: String,
    },
    ts: {
        type: String
    },
    date: {
        type: Date,
    },
    supply_apr: {
        type: String
    },
    borrow_apr: {
        type: String,
    },
    created_Date: {
        type: Date,
        default: new Date()
    },
    updated_Date: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('apr_data', aprDataSchema, 'apr_data');