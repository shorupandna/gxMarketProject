/*
 * user intrest calculation model
 * author: saileela puvvada
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSupplyStatistics = new Schema({
    user_eth_addr: {
        type: String
    },
    market_name: {
        type: String
    },
    //supply
    supply_balance_snapshot: {
        type: Number,
    },
    supply_accrue_snapshot: {
        type: Number,
    },
    supply_withdraw_timestamp_snapshot: {
        type: Number,
        default: Date.now()
    },
    withdraw_balance_snapshot: {
        type: Number
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('user_supply_statistic', userSupplyStatistics);