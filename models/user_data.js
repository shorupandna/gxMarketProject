/*
 * user_data model
 * author: saileela puvvada
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userDataSchema = new Schema({
    user_eth_addr: {
        type: String
    },
    description: {
        type: String
    },
    markets: [
        {
            "name": {
                type: String
            },
            "market_eth_addr": {
                type: String
            }
        },
    ],
    txn_hash: {
        type: String
    },
    user_type: {
        type: String,
        enum: ['admin', 'teachers']
    },
    status: {
        type: String,
        enum: ['active', 'inactive']
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

module.exports = mongoose.model('user_data', userDataSchema, 'user_data');