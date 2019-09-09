/**
 * autoincrement
 *
 * @module      :: Model
 * @description :: Represent data model for the autoincrement id's
 * @author      :: saileela Puvvada
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AutoLiquidationSchema = new Schema({
    target_account: {
        type: String
    },
    borrowing_asset: {
        type: String
    },
    collateral_asset: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    txn_hash: {
        type: String
    },
    error: {
        type: String
    }
});


module.exports = mongoose.model('auto_liquidation', AutoLiquidationSchema, 'auto_liquidation');



