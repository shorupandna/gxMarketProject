/*
 * user intrest calculation model
 * author: saileela puvvada
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userBorrowStatistics = new Schema({
    user_eth_addr: {
        type: String,
    },
    market_name: {
        type: String
    },
    borrow_balance_snapshot: {
        type: Number
    },
    repay_balance_snapshot: {
        type: Number
    },
    borrow_incur_snapshot: {
        type: Number
    },
    borrow_repay_timestamp_snapshot: {
        type: Number,
        default: Date.now()
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('user_borrow_statistic', userBorrowStatistics);