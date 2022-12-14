/*
 * gx money markets route
 * author : Saileela Puvvada, Karthik(@techkrtk)
 */

//blockchain related code
let market_json = require('../market-json');
let web3 = require('../web3init')()


const abiDecoder = require('abi-decoder');
abiDecoder.addABI(market_json);

let configAuth = require('../config')();

let market_contract = web3.eth.Contract(market_json, configAuth.mainnet_market)

// ────────────────────────────────────────────────────────────────────────────────


//models import
var userData = require('../models/user_data');
var aprData = require('../models/apr_data');
var Transcations = require('../models/transaction');
var Withdrawl = require('../models/withdrawl');
var userSupplyStatistics = require('../models/user_supply_statistics');
var userBorrowStatistics = require('../models/user_borrow_statistics');


//blockchain code
let get_market_name = (market_addr) => {
    switch (market_addr) {
        case "0x0d8775f648430679a709e98d2b0cb6250d2887ef":
            return ("BAT")
        case "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359":
            return ("DAI")
        case "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2":
            return ("WETH")
        case "0x1985365e9f78359a9b6ad760e32412f4a445e862":
            return ("REP")
        case "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48":
            return ("USDC")
        case "0xe41d2489571d322189246dafa5ebde1f4699f498":
            return ("ZRX")
        case "0x60c87297a1feadc3c25993ffcadc54e99971e307":
            return ("GXT")
        case "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599":
            return ("WBTC")
        default:
            break;
    }

}

//supply
var userIntrestCalculationSupply = (req, res) => {
    userData.findOne({
        user_eth_addr: req.body.user_eth_addr.toLowerCase()
    }).exec(function (err, user) {
        if (user) {

            let txn_hash = req.body.txn_hash;
            let user_eth_addr;
            let market_name;
            let supply_balance;
            let withdraw_balance;
            let supply_withdraw_accrue;

            web3.eth
                .getTransactionReceipt(txn_hash)
                .then(receipt_response => {
                    if (receipt_response.status) {
                        web3.eth
                            .getTransaction(txn_hash)
                            .then(txn_response => {

                                const decodedData = abiDecoder.decodeMethod(txn_response.input);
                                console.log(decodedData);

                                if (decodedData.name == "fund") {
                                    supply_balance = parseFloat(decodedData.params[1].value) / 10 ** 18;
                                    withdraw_balance = 0;
                                }

                                if (decodedData.name == "withdraw") {
                                    withdraw_balance = parseFloat(decodedData.params[1].value) / 10 ** 18;
                                    supply_balance = 0;
                                }

                                user_eth_addr = txn_response.from.toLowerCase();
                                market_name = get_market_name(decodedData.params[0].value);

                                let ts = Date.now();
                                var options = {
                                        timeZone: 'America/New_York'
                                    },
                                    estTime = new Date(ts);
                                let date = estTime.toLocaleString('en-US', options);

                                market_contract.methods
                                    .get_supply_balance(user_eth_addr, decodedData.params[0].value)
                                    .call()
                                    .then(supply_bal_response => {
                                        supply_withdraw_accrue = supply_bal_response / 10 ** 18;
                                        var supplyCalculation = new userSupplyStatistics({
                                            user_eth_addr: user_eth_addr,
                                            market_name: market_name,
                                            supply_balance_snapshot: supply_balance,
                                            supply_accrue_snapshot: supply_withdraw_accrue,
                                            withdraw_balance_snapshot: withdraw_balance,
                                            supply_withdraw_timestamp_snapshot: Date.now(),
                                            txn_hash: txn_hash,
                                            date: date
                                        });
                                        supplyCalculation.save(function (err, supply_acure_saved) {
                                            console.log(supply_acure_saved);
                                            if (supply_acure_saved) {
                                                res.send(supply_acure_saved);
                                            } else {
                                                res.send("failed in saving intrest calculation");
                                            }
                                        })
                                    })


                                // const decodedLogs = abiDecoder.decodeLogs(x.logs);
                                // console.log(decodedLogs);
                            });
                    }
                });




        } else {
            res.send("user_eth_addr not found ");
        };
    });
};

var getAllSupplyStatistics = (req, res) => {
    userSupplyStatistics.find().exec(function (err, user_supply_statistic) {
        if (user_supply_statistic.length > 0) {
            var ref = {};
            var result = Object.values(user_supply_statistic.reduce((obj, o) => {
                var usr = o.user_eth_addr;
                if (!(usr in obj)) {
                    obj[usr] = {
                        user_eth: usr,
                        coins: []
                    }
                }
                var key = usr + '|' + o.market_name;
                if (!(key in ref)) {
                    obj[usr].coins[ref[key] = obj[usr].coins.length] = {
                        coin: o.market_name,
                        calculation: []
                    };
                }
                obj[usr].coins[ref[key]].calculation.push({
                    supply_balance_snapshot: o.supply_balance_snapshot,
                    supply_accrue_snapshot: o.supply_accrue_snapshot,
                    withdraw_balance_snapshot: o.withdraw_balance_snapshot,
                    supply_withdraw_timestamp_snapshot: o.supply_withdraw_timestamp_snapshot
                });
                return obj;
            }, {}));
            res.send(result);
        } else {
            res.send("No Docs Available");
        }
    })
};

var getUserSupplyStatistics = (req, res) => {
    userSupplyStatistics.find({
        user_eth_addr: req.body.user_eth_addr.toLowerCase()
    }).exec(function (err, user_statistics) {
        console.log(user_statistics);
        if (user_statistics.length > 0) {
            var ref = {};
            var result = user_statistics.reduce((obj, o) => {
                var usr = o.user_eth_addr;
                if (!(usr in obj)) {
                    obj[usr] = {

                        coins: []
                    }
                }
                var key = usr + '|' + o.market_name;
                if (!(key in ref)) {
                    obj[usr].coins[ref[key] = obj[usr].coins.length] = {
                        coin: o.market_name,
                        calc: []
                    };
                }
                obj[usr].coins[ref[key]].calc.push({
                    supply_balance_snapshot: o.supply_balance_snapshot,
                    supply_accrue_snapshot: o.supply_accrue_snapshot,
                    withdraw_balance_snapshot: o.withdraw_balance_snapshot,
                    supply_withdraw_timestamp_snapshot: o.supply_withdraw_timestamp_snapshot
                });

                return obj;
            }, {});
            res.send(result);
        } else {
            res.send('No docs Available');
        }
    })
};

var getUserSupplyStatisticsForCoin = (req, res) => {
    userSupplyStatistics.find({
        $and: [{
            user_eth_addr: req.body.user_eth_addr.toLowerCase()
        }, {
            market_name: req.body.market_name
        }]
    }).exec(function (err, supply_statistics) {
        if (supply_statistics.length > 0) {
            res.send(supply_statistics);
        } else {
            res.send("No Docs Available");
        }
    });
};

// var totalSupplyIntrst = (req, res) => {
//     userSupplyStatistics.aggregate(
//         [{
//             $match: {
//                 user_eth_addr: req.body.user_eth_addr.toLowerCase()
//             }
//         },
//         {
//             $group: {
//                 _id: "$market_name",
//                 total_supply_balance_snapshot: {
//                     $sum: "$supply_balance_snapshot"
//                 },
//                 total_withdraw_balance_snapshot: {
//                     $sum: "$withdraw_balance_snapshot"
//                 },
//                 total_supply_accrue_snapshot: {
//                     $sum: "$supply_accrue_snapshot"
//                 },
//                 count: {
//                     $sum: 1
//                 }
//             }
//         }
//         ]).exec(function (err, data) {
//             if (data) {
//                 res.send(data);
//             } else {
//                 res.send("No data available")
//             }

//         });
// }

var totalSupplyIntrst = (req, res) => {
    userSupplyStatistics.aggregate(
        [{
                $match: {
                    $and: [{
                        user_eth_addr: req.body.user_eth_addr.toLowerCase()
                    }, {
                        market_name: req.body.market_name
                    }]
                }
            },
            {
                $group: {
                    _id: "$market_name",
                    total_supply_balance_snapshot: {
                        $sum: "$supply_balance_snapshot"
                    },
                    total_withdraw_balance_snapshot: {
                        $sum: "$withdraw_balance_snapshot"
                    },
                    count: {
                        $sum: 1
                    }
                }
            }
        ]).exec(function (err, data) {
        if (data.length > 0) {
            res.send(data);
        } else {
            res.send("No data available")
        }

    });
}
var latestSupWithAccruesnapShot = function (req, res) {
    userSupplyStatistics.find({
        $and: [{
            user_eth_addr: req.body.user_eth_addr.toLowerCase()
        }, {
            market_name: req.body.market_name
        }]
    }).sort({
        supply_withdraw_timestamp_snapshot: -1
    }).exec(function (err, sorted_res) {
        console.log(sorted_res[0])
        if (sorted_res.length > 0) {
            res.send({
                supply_accrue_snapshot: sorted_res[0].supply_accrue_snapshot,
                date: sorted_res[0].date
            });
        } else {
            res.send('Something Wrong');
        }
    })
}

//borrow 
var userIntrestCalculationBorrow = (req, res) => {
    userData.findOne({
        user_eth_addr: req.body.user_eth_addr.toLowerCase()
    }).exec(function (err, user) {
        if (user) {

            let txn_hash = req.body.txn_hash;
            let user_eth_addr;
            let market_name;
            let borrow_balance;
            let repay_balance;
            let borrow_repay_incur;

            web3.eth
                .getTransactionReceipt(txn_hash)
                .then(receipt_response => {
                    if (receipt_response.status) {
                        web3.eth
                            .getTransaction(txn_hash)
                            .then(txn_response => {

                                const decodedData = abiDecoder.decodeMethod(txn_response.input);
                                console.log(decodedData);

                                if (decodedData.name == "borrow") {
                                    borrow_balance = parseFloat(decodedData.params[1].value) / 10 ** 18;
                                    repay_balance = 0;
                                }

                                if (decodedData.name == "repay_borrow") {
                                    repay_balance = parseFloat(decodedData.params[1].value) / 10 ** 18;
                                    borrow_balance = 0;
                                }

                                user_eth_addr = txn_response.from.toLowerCase();
                                market_name = get_market_name(decodedData.params[0].value);

                                let ts = Date.now();
                                var options = {
                                        timeZone: 'America/New_York'
                                    },
                                    estTime = new Date(ts);
                                let date = estTime.toLocaleString('en-US', options);

                                market_contract.methods
                                    .get_borrow_balance(user_eth_addr, decodedData.params[0].value)
                                    .call()
                                    .then(borrow_bal_response => {
                                        borrow_repay_incur = borrow_bal_response / 10 ** 18;
                                        var borrowCalculation = new userBorrowStatistics({
                                            user_eth_addr: user_eth_addr,
                                            market_name: market_name,
                                            borrow_balance_snapshot: borrow_balance,
                                            repay_balance_snapshot: repay_balance,
                                            borrow_incur_snapshot: borrow_repay_incur,
                                            borrow_repay_timestamp_snapshot: Date.now(),
                                            date: date
                                        });
                                        borrowCalculation.save(function (err, borrow_incur_saved) {
                                            console.log(borrow_incur_saved);
                                            if (borrow_incur_saved) {
                                                res.send(borrow_incur_saved);
                                            } else {
                                                res.send("failed in saving borrow calculation");
                                            }
                                        });

                                    })


                                // const decodedLogs = abiDecoder.decodeLogs(x.logs);
                                // console.log(decodedLogs);
                            });
                    }
                });




        } else {
            res.send("No user_eth_addr found");
        };
    });
};

var getAllBorrowStatistics = (req, res) => {
    userBorrowStatistics.find().exec(function (err, user_supply_statistic) {
        if (user_supply_statistic.length > 0) {
            var ref = {};
            var result = Object.values(user_supply_statistic.reduce((obj, o) => {
                var usr = o.user_eth_addr;
                if (!(usr in obj)) {
                    obj[usr] = {
                        user_eth: usr,
                        coins: []
                    }
                }
                var key = usr + '|' + o.market_name;
                if (!(key in ref)) {
                    obj[usr].coins[ref[key] = obj[usr].coins.length] = {
                        coin: o.market_name,
                        calculation: []
                    };
                }
                obj[usr].coins[ref[key]].calculation.push({
                    borrow_balance_snapshot: o.borrow_balance_snapshot,
                    repay_balance_snapshot: o.repay_balance_snapshot,
                    borrow_incur_snapshot: o.borrow_incur_snapshot,
                    borrow_repay_timestamp_snapshot: o.borrow_repay_timestamp_snapshot
                });
                return obj;
            }, {}));
            res.send(result);
        } else {
            res.send("No Docs Available");
        }
    })
};

var getUserBorrowStatistics = (req, res) => {
    userBorrowStatistics.find({
        user_eth_addr: req.body.user_eth_addr.toLowerCase()
    }).exec(function (err, user_borrow_statistics) {
        console.log(user_borrow_statistics);
        if (user_borrow_statistics.length > 0) {
            var ref = {};
            var result = user_borrow_statistics.reduce((obj, o) => {
                var usr = o.user_eth_addr;
                if (!(usr in obj)) {
                    obj[usr] = {

                        coins: []
                    }
                }
                var key = usr + '|' + o.market_name;
                if (!(key in ref)) {
                    obj[usr].coins[ref[key] = obj[usr].coins.length] = {
                        coin: o.market_name,
                        calc: []
                    };
                }
                obj[usr].coins[ref[key]].calc.push({
                    borrow_balance_snapshot: o.borrow_balance_snapshot,
                    repay_balance_snapshot: o.repay_balance_snapshot,
                    borrow_incur_snapshot: o.borrow_incur_snapshot,
                    borrow_repay_timestamp_snapshot: o.borrow_repay_timestamp_snapshot
                });

                return obj;
            }, {});
            res.send(result);
        } else {
            res.send("No Docs Available For This User " + req.body.user_eth_addr.toLowerCase());
        }
    })
};

var getUserBorrowStatisticsForCoin = (req, res) => {
    userBorrowStatistics.find({
        $and: [{
            user_eth_addr: req.body.user_eth_addr.toLowerCase()
        }, {
            market_name: req.body.market_name
        }]
    }).exec(function (err, borrow_statistics) {
        if (borrow_statistics.length > 0) {
            res.send(borrow_statistics);
        } else {
            res.send("No Docs Available");
        }
    });
};

// var totalBorrowIntrst = (req, res) => {
//     userBorrowStatistics.aggregate(
//         [{
//             $match: {
//                 user_eth_addr: req.body.user_eth_addr.toLowerCase()
//             }
//         },
//         {
//             $group: {
//                 _id: {
//                     coin: "$market_name",
//                     total_borrow_balance_snapshot: {
//                         $sum: "$borrow_balance_snapshot"
//                     },
//                     total_repay_balance_snapshot: {
//                         $sum: "$repay_balance_snapshot"
//                     },
//                     total_borrow_incur_snapshot: {
//                         $sum: "$borrow_incur_snapshot"
//                     },
//                     count: {
//                         $sum: 1
//                     }
//                 }
//             }
//         }
//         ]).exec(function (err, data) {
//             if (data) {
//                 console.log(data);
//                 res.send(data);
//             } else {
//                 res.send("No data available")
//             }

//         });
// }

var totalBorrowIntrst = (req, res) => {
    userBorrowStatistics.aggregate(
        [{
                $match: {
                    $and: [{
                        user_eth_addr: req.body.user_eth_addr.toLowerCase()
                    }, {
                        market_name: req.body.market_name
                    }]
                }
            },
            {
                $group: {

                    _id: "$market_name",
                    total_borrow_balance_snapshot: {
                        $sum: "$borrow_balance_snapshot"
                    },
                    total_repay_balance_snapshot: {
                        $sum: "$repay_balance_snapshot"
                    },
                    count: {
                        $sum: 1
                    }

                }
            }
        ]).exec(function (err, data) {
        if (data.length > 0) {
            console.log(data);
            res.send(data);
        } else {
            res.send("No data available");
        }

    });
}

var latestRepBorIncursnapShot = function (req, res) {
    userBorrowStatistics.find({
        $and: [{
            user_eth_addr: req.body.user_eth_addr.toLowerCase()
        }, {
            market_name: req.body.market_name
        }]
    }).sort({
        borrow_repay_timestamp_snapshot: -1
    }).exec(function (err, sorted_res) {
        if (sorted_res.length > 0) {
            res.send({
                borrow_incur_snapshot: sorted_res[0].supply_accrue_snapshot,
                date: sorted_res[0].date
            });
        } else {
            res.send('Something Wrong');
        }
    })
}

var createGxmmMarket = (req, res) => {
    userData.findOne({
        user_eth_addr: req.body.user_eth_addr.toLowerCase()
    }, function (err, user_found) {
        console.log(user_found);
        var query = {
            user_eth_addr: req.body.user_eth_addr.toLowerCase(),
            markets: [{
                name: req.body.market_name,
                market_eth_addr: req.body.market_eth_addr
            }]
        }
        if (!user_found) {
            var userDetails = new userData(query);
            userDetails.save(function (err, user_saved) {
                if (user_saved) {
                    res.send(true);
                } else {
                    res.send('Something Gone Wrong In Entering Market');
                }
            });
        } else {
            userData.update({
                user_eth_addr: query.user_eth_addr.toLowerCase()
            }, {
                $push: {
                    markets: {
                        name: req.body.market_name,
                        market_eth_addr: req.body.market_eth_addr
                    }
                }
            }).exec(function (err, user_updated) {
                if (user_updated) {
                    res.send(true);
                } else {
                    res.send('Something Gone Wrong In Updating Market');
                }
            });

        }
        var TranscationsStats = new Transcations({
            user_eth_addr: req.body.user_eth_addr.toLowerCase(),
            description: `Enabled ${req.body.market_name}`,
            market_name: req.body.market_name,
            txn_hash: req.body.txn_hash,
            date:  req.body.date
        });
        TranscationsStats.save();
    });
}

var getGxmmMarkets = (req, res) => {
    userData.find({
        $and: [{
            user_eth_addr: req.body.user_eth_addr.toLowerCase(),
            'markets.name': req.body.market_name
        }]
    }, {
        'markets.name': 1,
        _id: 0
    }).exec(function (err, docs) {
        if (err) {
            res.send(false);
            console.log(err);
        } else {
            console.log(docs);
            docs.length > 0 ? res.send('Enabled') : res.send('Disabled');
        }
    });
};

var gxmmWithdrawRequest = (req, res) => {
    userData.findOne({
        user_eth_addr: req.body.user_eth_addr.toLowerCase()
    }).exec(function (err, user) {
        if (user) {
            var withdraw_req = new Withdrawl(req.body);
            withdraw_req.save(function (err, withdraw_req_saved) {
                if (withdraw_req_saved) {
                    res.send(true);
                } else {
                    res.send('Failure In Saving Withdraw Request');
                }
            });
        } else {
            res.send("Not a User");
        };
    });
}

var getGxmmWithdrawls = (req, res) => {
    Withdrawl.find({
        user_eth_addr: req.body.user_eth_addr.toLowerCase()
    }).exec(function (err, docs) {
        if (err) {
            res.send(err);
        } else {
            let pending_withdrawals = [];
            let completed_withdrawals = [];
            let partial_withdrawals = [];
            docs.map(txn => {
                if (txn.status == 'Completed' || txn.status == 'Sufficient Coins') {
                    completed_withdrawals.push(txn);
                }
                if (
                    txn.status == 'pending' ||
                    txn.status == 'partial' ||
                    txn.status == 'Procuring Coins' ||
                    txn.status == 'Insufficient Coins'
                )
                    pending_withdrawals.push(txn);
                if (txn.status == 'partial') partial_withdrawals.push(txn);
            });
            res.send({
                pending: pending_withdrawals,
                partial: partial_withdrawals,
                completed: completed_withdrawals
            });
        }
    });
};

var saveTransaction = (req, res) => {
    userData.findOne({
        user_eth_addr: req.body.user_eth_addr.toLowerCase()
    }).exec(function (err, transactions) {
        if (err) {
            res.send(err);
        } else {
            let request = {
                ...req.body
            };
            request.user_eth_addr = request.user_eth_addr.toLowerCase();
            var saveTransaction = new Transcations(request);
            saveTransaction.save(function (err, transaction_saved) {
                if (transaction_saved) {
                    res.send(true);
                } else {
                    res.send('Something wrong in saving transcation');
                }
            });
        }
    });
};

var getGxmmTransctions = (req, res) => {
    var query = {
        $and: [{
            user_eth_addr: req.body.user_eth_addr.toLowerCase()
        }, {
            market_name: req.body.market_name
        }]
    }
    Transcations.find(query).exec(function (err, docs) {
        if (err) {
            res.send(err);
            res.send(false);
        } else {
            docs.length > 0 ? res.send(docs) : res.send('No Data');
        }
    });
};

let getGxmmMarketTransctions = (req, res) => {
    let request = {
        ...req.body
    };
    if (request.market_name == 'all') {
        var query = {};
    } else {
        var query = {
            market_name: req.body.market_name
        }
    }

    Transcations.find(query).exec(function (err, docs) {
        if (err) {
            res.send(err);
            res.send(false);
        } else {
            docs.length > 0 ? res.send(docs) : res.send('No Data');
        }
    });
}

var getAllGxmmWithdrawls = (req, res) => {
    Withdrawl.find({}).exec(function (err, txns_withdrawls) {
        if (txns_withdrawls) {
            let pending_withdrawals = [];
            let completed_withdrawals = [];
            let partial_withdrawals = [];
            txns_withdrawls.map(txn => {
                if (txn.status == 'Completed' || txn.status == 'Sufficient Coins') {
                    completed_withdrawals.push(txn);
                }
                if (
                    txn.status == 'pending' ||
                    txn.status == 'Insufficient Coins'
                )
                    pending_withdrawals.push(txn);
                if (txn.status == 'partial' ||
                    txn.status == 'Procuring Coins') partial_withdrawals.push(txn);
            });
            res.json({
                success: true,
                pending_withdrawals: pending_withdrawals,
                partial_withdrawals: partial_withdrawals,
                completed_withdrawals: completed_withdrawals
            })
        } else {
            res.json({
                success: false,
                message: toString(error.message)
            });

        }
    });
};

var gxmmUpdateWithdrawl = async (req, res) => {
    let obj = {};
    if (req.body.Id != undefined || req.body.Id != '' || req.body.Id != null) {
        if (req.body.user_eth_addr != null)
            obj.user_eth_addr = req.body.user_eth_addr.toLowerCase();
        if (req.body.available_withdraw_amount != null)
            obj.available_withdraw_amount = req.body.available_withdraw_amount;
        try {
            await Withdrawl.findOneAndUpdate({
                _id: req.body.Id
            }, {
                $set: obj
            }).exec(function (err, updated) {
                if (updated) {
                    res.json({
                        success: true,
                        message: "Successfully Updated"
                    });
                } else {
                    res.send(err);
                }
            });
        } catch (error) {
            res.json({
                success: false,
                message: toString(error.message)
            });
        }
    } else {
        res.json({
            success: false,
            message: "Please Send The ID"
        });
    }
};

var gxmmAprData = (req, res) => {
    aprData.find({
        market_name: req.body.market_name
    }).exec(function (err, docs) {
        if (err) res.send(err);
        else res.send(docs);
    });
};

var gxmmTransactionStatusUpdate = async (req, res) => {
    if (req.body.Id != undefined && req.body.status != undefined) {
        Withdrawl.findOneAndUpdate({
            _id: req.body.Id
        }, {
            $set: {
                status: req.body.status
            }
        }).exec(function (err, updated) {
            if (updated) {
                res.json({
                    success: true,
                    message: "Successfully Updated"
                });
            } else {
                res.json({
                    success: false,
                    message: toString(error.message)
                });
            }
        });
    } else {
        res.json({
            status: 'failure',
            message: 'Please send the Id and The status'
        });
    }
};

module.exports.route = function (router) {
    router.post('/enter_market', createGxmmMarket);
    router.post('/get_markets', getGxmmMarkets);
    router.post('/withdraw_request', gxmmWithdrawRequest);
    router.post('/get_withdrawals', getGxmmWithdrawls);
    router.post('/save_txn', saveTransaction);
    router.post('/get_txns', getGxmmTransctions);
    router.post('/get_market_txns', getGxmmMarketTransctions);
    router.get('/allwithdrawals', getAllGxmmWithdrawls);
    router.post('/update_withdrawl', gxmmUpdateWithdrawl);
    router.post('/get_apr_data', gxmmAprData);
    router.post('/txn_status', gxmmTransactionStatusUpdate);

    // new implementation
    // supply 
    router.post('/userintrestcalc/supplywithdraw', userIntrestCalculationSupply);
    router.get('/getallstatistics/supplywithdraw', getAllSupplyStatistics);
    router.post('/getuserstatistics/supplywithdraw', getUserSupplyStatistics);
    router.post('/getusersstatisticsforcoin/supplywithdraw', getUserSupplyStatisticsForCoin);
    router.post('/totalsupplywithdrawsnapshot', totalSupplyIntrst);
    router.post('/latestsupwithaccrue', latestSupWithAccruesnapShot);
    // router.post('/totalsupplyintrest2', totalSupplyIntrst2);

    //borrow
    router.post('/userintrestcalc/borrowrepay', userIntrestCalculationBorrow);
    router.get('/getallstatistics/borrowrepay', getAllBorrowStatistics);
    router.post('/getuserstatistics/borrowrepay', getUserBorrowStatistics);
    router.post('/getusersstatisticsforcoin/borrowrepay', getUserBorrowStatisticsForCoin);
    router.post('/totalborrowrepaysnapshot', totalBorrowIntrst);
    router.post('/latestrepborincur', latestRepBorIncursnapShot);
    // router.post('/totalborrowintrest2', totalBorrowIntrst2);



};