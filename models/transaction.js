/*
 * transaction model
 * author: saileela puvvada
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transactionSchema = new Schema({
    user_eth_addr: {
        type: String
    },
    description: {
        type: String
    },
    market_name: {
        type: String,
        enum: ['WETH', 'BAT', 'GXT', 'ZRX', 'DAI', '0X', 'ZRX', 'REP']
    },
    txn_hash: {
        type: String
    },
    supply: {
        type: String,
    },
    timestamp: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'partial', 'Procuring Coins', 'Sufficient Coins', 'Insufficient Coins']
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

module.exports = mongoose.model('transcation', transactionSchema);