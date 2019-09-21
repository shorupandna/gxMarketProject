/*
 * user_data model
 * author: saileela puvvada
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userDataSchema = new Schema({
  user_eth_addr: {
    type: String,
    required: true
  },
  markets: [
    {
      name: {
        type: String,
        required: true
      },
      market_eth_addr: {
        type: String,
        required: true
      }
    }
  ],
  market_eth_addr: {
    type: String
  },
  market_name: {
    type: String
  }
});

module.exports = mongoose.model("user_data", userDataSchema, "user_data");
