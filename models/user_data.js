/*
 * user_data model
 * author: saileela puvvada
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userDataSchema = new Schema({
    user_eth_addr: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    markets: [
        {
            "name": {
                type: String,
                required: true
            },
            "market_eth_addr": {
                type: String,
                required: true
            }
        },
    ],
    txn_hash: {
        type: String,
        required: true
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

module.exports = mongoose.model('user_data', userDataSchema, 'user_data');