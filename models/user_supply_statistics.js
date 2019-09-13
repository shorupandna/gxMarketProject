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
        default: "0"
    },
    supply_accrue_snapshot: {
        type: Number,
    },
    supply_withdraw_timestamp_snapshot: {
        type: Number,
        default: Date.now()
    },
    withdraw_balance_snapshot: {
        type: Number,
        default: "0"
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    date: {
        type: String,
        default: Date.now()
    }
});

module.exports = mongoose.model('user_supply_statistic', userSupplyStatistics);