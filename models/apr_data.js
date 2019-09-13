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
        type: String
    },
    supply_apr: {
        type: String
    },
    borrow_apr: {
        type: String,
    },
    time_stamp: {
        type: Number,
        default: Date.now()
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('apr_data', aprDataSchema, 'apr_data');