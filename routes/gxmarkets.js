/*
 * gx money markets route
 * author : Saileela Puvvada
 */

var userData = require('../models/user_data');
var aprData = require('../models/apr_data');
var Transcations = require('../models/transaction');
var Withdrawl = require('../models/withdrawl');
var userSupplyStatistics = require('../models/user_supply_statistics');
var userBorrowStatistics = require('../models/user_borrow_statistics');

//supply
var userIntrestCalculationSupply = (req, res) => {
    userData.findOne({ user_eth_addr: req.body.user_eth_addr }).exec(function (err, user) {
        if (user) {
            var supplyCalculation = new userSupplyStatistics({
                user_eth_addr: user.user_eth_addr,
                market_name: req.body.market_name,
                supply_balance_snapshot: req.body.supply_balance_snapshot,
                supply_accrue_snapshot: req.body.supply_accrue_snapshot,
                withdraw_balance_snapshot: req.body.withdraw_balance_snapshot
            });
            supplyCalculation.save(function (err, supply_acure_saved) {
                console.log(supply_acure_saved);
                if (supply_acure_saved) {
                    res.send({ status: "success", message: "success", message: supply_acure_saved });
                } else {
                    res.send({ status: "failure", message: "failed in saving intrest calculation" });
                }
            })
        } else {
            res.send({ status: "failure", message: "user_eth_addr not found " });
        };
    });
};

var getAllSupplyStatistics = (req, res) => {
    userSupplyStatistics.find().exec(function (err, user_supply_statistic) {
        if (user_supply_statistic) {
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
            res.send({ status: "success", user_statistics: result });
        } else {
            res.send({ status: "failure", message: "No Docs Available" });
        }
    })
};

var getUserSupplyStatistics = (req, res) => {
    userSupplyStatistics.find({ user_eth_addr: req.body.user_eth_addr }).exec(function (err, user_statistics) {
        console.log(user_statistics);
        if (user_statistics) {
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
            res.send({ status: "success", message: result });
        } else {
            res.send({ status: "failure", message: "No Docs Available For This User " + req.body.user_eth_addr });
        }
    })
};

var getUserSupplyStatisticsForCoin = (req, res) => {
    userSupplyStatistics.find({ $and: [{ user_eth_addr: req.body.user_eth_addr }, { market_name: req.body.market_name }] }).exec(function (err, supply_statistics) {
        if (supply_statistics) {
            res.send({ status: "success", message: supply_statistics });
        } else {
            res.send({ status: "failure", message: "No Docs Available" });
        }
    });
};

var totalSupplyIntrst = (req, res) => {
    userSupplyStatistics.aggregate(
        [
            { $match: { user_eth_addr: req.body.user_eth_addr } },
            { $group: { _id: "$market_name", total_supply_balance_snapshot: { $sum: "$supply_balance_snapshot" }, total_withdraw_balance_snapshot: { $sum: "$withdraw_balance_snapshot" }, total_supply_accrue_snapshot: { $sum: "$supply_accrue_snapshot" }, count: { $sum: 1 } } }]).exec(function (err, data) {
                if (data) {
                    console.log(data);
                    res.send({ status: "success", message: data });
                } else {
                    res.send({ status: "failure", message: "No data available" })
                }

            });
}


//borrow 
var userIntrestCalculationBorrow = (req, res) => {
    userData.findOne({ user_eth_addr: req.body.user_eth_addr }).exec(function (err, user) {
        if (user) {
            var borrowCalculation = new userBorrowStatistics({
                user_eth_addr: user.user_eth_addr,
                market_name: req.body.market_name,
                borrow_balance_snapshot: req.body.borrow_balance_snapshot,
                repay_balance_snapshot: req.body.repay_balance_snapshot,
                borrow_incur_snapshot: req.body.borrow_incur_snapshot
            });
            borrowCalculation.save(function (err, borrow_incur_saved) {
                console.log(borrow_incur_saved);
                if (borrow_incur_saved) {
                    res.send({ status: "success", message: "success", message: borrow_incur_saved });
                } else {
                    res.send({ status: "failure", message: "failed in saving borrow calculation" });
                }
            });
        } else {
            res.send({ status: "failure", message: "No user_eth_addr found" });
        };
    });
};

var getAllBorrowStatistics = (req, res) => {
    userBorrowStatistics.find().exec(function (err, user_supply_statistic) {
        if (user_supply_statistic) {
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
            res.send({ status: "success", user_statistics: result });
        } else {
            res.send({ status: "failure", message: "No Docs Available" });
        }
    })
};

var getUserBorrowStatistics = (req, res) => {
    userBorrowStatistics.find({ user_eth_addr: req.body.user_eth_addr }).exec(function (err, user_borrow_statistics) {
        console.log(user_borrow_statistics);
        if (user_borrow_statistics) {
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
            res.send({ status: "success", message: result });
        } else {
            res.send({ status: "failure", message: "No Docs Available For This User " + req.body.user_eth_addr });
        }
    })
};

var getUserBorrowStatisticsForCoin = (req, res) => {
    userBorrowStatistics.find({ $and: [{ user_eth_addr: req.body.user_eth_addr }, { market_name: req.body.market_name }] }).exec(function (err, borrow_statistics) {
        if (borrow_statistics) {

            res.send({ status: "success", message: borrow_statistics });
        } else {
            res.send({ status: "failure", message: "No Docs Available" });
        }
    });
};

var totalBorrowIntrst = (req, res) => {
    userBorrowStatistics.aggregate(
        [
            { $match: { user_eth_addr: req.body.user_eth_addr } },
            { $group: { _id: { coin: "$market_name", total_borrow_balance_snapshot: { $sum: "$borrow_balance_snapshot" }, total_repay_balance_snapshot: { $sum: "$repay_balance_snapshot" }, total_borrow_incur_snapshot: { $sum: "$borrow_incur_snapshot" }, count: { $sum: 1 } } } }]).exec(function (err, data) {
                if (data) {
                    console.log(data);
                    res.send({ status: "success", message: data });
                } else {
                    res.send({ status: "failure", message: "No data available" })
                }

            });
}


var createGxmmMarket = (req, res) => {
    userData.findOne({ user_eth_addr: req.body.user_eth_addr }, function (err, user_found) {
        console.log(user_found);
        var query = {
            user_eth_addr: req.body.user_eth_addr,
            description: `Enabled ${req.body.market_name}`,
            markets: [
                {
                    name: req.body.market_name,
                    market_eth_addr: req.body.market_eth_addr
                }
            ],
            txn_hash: req.body.txn_hash
        }
        if (!user_found) {
            var userDetails = new userData(query);
            userDetails.save(function (err, user_saved) {
                if (user_saved) {
                    res.send({ status: 'success', message: user_saved });
                } else {
                    res.send({ status: 'failure', message: 'Something Gone Wrong In Saving User Data' });
                }
            });
        } else {
            userData.update(query).exec(function (err, user_updated) {
                if (user_updated) {
                    res.send({ status: 'success', message: 'Updated Succesfully' });
                } else {
                    res.send({ status: 'failure', message: 'something wrong in updating user data' });
                }
            });

        }
    });
}

var getGxmmMarkets = (req, res) => {
    userData.find({ $and: [{ user_eth_addr: req.body.user_eth_addr, 'markets.name': req.body.market_name }] }, { 'markets.name': 1, _id: 0 }).exec(function (err, docs) {
        if (err) {
            res.send(false);
            console.log(err);
        } else {
            console.log(docs);
            docs.length > 0 ? res.send({ status: 'success', message: docs }) : res.send({ status: 'failure', message: 'No documents available matched to ' + req.body.user_eth_addr + ' & ' + req.body.market_name });
        }
    });
};

var gxmmWithdrawRequest = (req, res) => {
    Withdrawl.find({}).exec(function (err, withdraw_request) {
        if (withdraw_request) {
            var withdraw_req = new Withdrawl(req.body);
            withdraw_req.save(function (err, withdraw_req_saved) {
                if (withdraw_req_saved) {
                    res.send({ status: 'success', message: "Withdraw Request Saved" });
                } else {
                    res.send({ status: 'failure', message: 'Failure In Saving Withdraw Request' });
                }
            })
        } else {
            res.send({ status: 'failure', message: 'Data not enetered' })
        }
    });
};

var getGxmmWithdrawls = (req, res) => {
    Withdrawl.find({ user_eth_addr: req.body.user_eth_addr.toLowerCase() }).exec(function (err, docs) {
        if (!docs) {
            res.send({ status: 'failure' });
        }
        else {
            let pending_withdrawals = [];
            let completed_withdrawals = [];
            let partial_withdrawals = [];
            docs.map(txn => {
                if (txn.status == 'completed') {
                    completed_withdrawals.push(txn);
                }
                if (
                    txn.status == 'pending' ||
                    txn.status == 'partial' ||
                    txn.status == 'Procuring Coins' ||
                    txn.status == 'Sufficient Coins'
                )
                    pending_withdrawals.push(txn);
                if (txn.status == 'partial') partial_withdrawals.push(txn);
            });
            res.send({ status: 'success', pending: pending_withdrawals, partial: partial_withdrawals, completed: completed_withdrawals });
        }
    });
};

var saveTransaction = (req, res) => {
    Transcations.find({}).exec(function (err, transactions) {
        if (transactions) {
            var saveTransaction = new Transcations(req.body);
            saveTransaction.save(function (err, transaction_saved) {
                if (transaction_saved) {
                    res.send({ status: 'success', message: transaction_saved });
                } else {
                    res.send({ status: 'failure', message: 'Something wrong in saving transcation' });
                }
            });
        } else {
            res.send({ status: 'failure', message: err });
        }
    });
};

var getGxmmTransctions = (req, res) => {
    var query = {
        $and: [{ user_eth_addr: req.body.user_eth_addr.toLowerCase() }, { market_name: req.body.market_name }]
    }
    Transcations.find(query).exec(function (err, docs) {
        if (docs) {
            res.send({ status: 'success', message: docs });

        } else {
            res.send({ status: 'failure', message: 'No transcations found' });
        }
    });
};

var getAllGxmmWithdrawls = (req, res) => {
    let completed_withdrawals = [];
    let pending_withdrawals = [];
    let partial_withdrawals = [];
    Withdrawl.find({}).exec(function (err, txns_withdrawls) {
        if (txns_withdrawls) {
            let pending_withdrawals = [];
            let completed_withdrawals = [];
            let partial_withdrawals = [];
            txns_withdrawls.map(txn => {
                if (txn.status == 'completed') {
                    completed_withdrawals.push(txn);
                }
                if (
                    txn.status == 'pending' ||
                    txn.status == 'partial' ||
                    txn.status == 'Procuring Coins' ||
                    txn.status == 'Sufficient Coins'
                )
                    pending_withdrawals.push(txn);
                if (txn.status == 'partial') partial_withdrawals.push(txn);
            });
            res.send({ status: 'success', pending: pending_withdrawals, partial: partial_withdrawals, completed: completed_withdrawals });
        } else {

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
            await Withdrawl.findOneAndUpdate({ _id: req.body.Id }, { $set: obj }).exec(function (err, updated) {
                if (updated) {
                    res.json({
                        status: 'success',
                        message: 'Successfully Updated',
                        records: updated
                    });
                } else {
                    res.send({ status: 'failure', message: err });
                }
            });
        } catch (error) {
            res.json({ status: 'failure', message: toString(error.message) });
        }
    } else {
        res.json({
            status: failure,
            message: 'Please Send The ID'
        });
    }
};

var gxmmAprData = (req, res) => {
    aprData.find({ market_name: req.body.market_name }).exec(function (err, docs) {
        if (err) res.send(err);
        else res.send(docs);
    });
};

var gxmmTransactionStatusUpdate = async (req, res) => {
    if (req.body.Id != undefined && req.body.status != undefined) {
        Withdrawl.findOneAndUpdate({ _id: req.body.Id }, { $set: { status: req.body.status } }).exec(function (err, updated) {
            if (updated) {
                res.json({
                    status: 'success',
                    message: 'Successfully Updated',
                    records: updated
                });
            } else {
                res.json({
                    status: 'failure',
                    message: 'Not updated'
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
    router.get('/allwithdrawals', getAllGxmmWithdrawls);
    router.post('/update_withdrawl', gxmmUpdateWithdrawl);
    router.post('/get_apr_data', gxmmAprData);
    router.post('/txn_status', gxmmTransactionStatusUpdate);

    // new implementation
    // supply 
    router.post('/userintrestcalc/supply', userIntrestCalculationSupply);
    router.get('/getallstatistics/supply', getAllSupplyStatistics);
    router.post('/getuserstatistics/supply', getUserSupplyStatistics);
    router.post('/getusersstatisticsforcoin/supply', getUserSupplyStatisticsForCoin);
    router.post('/totalsupplyintrest', totalSupplyIntrst);
    //borrow
    router.post('/userintrestcalc/borrow', userIntrestCalculationBorrow);
    router.get('/getallstatistics/borrow', getAllBorrowStatistics);
    router.post('/getuserstatistics/borrow', getUserBorrowStatistics);
    router.post('/getusersstatisticsforcoin/borrow', getUserBorrowStatisticsForCoin);
    router.post('/totalborrowintrest', totalBorrowIntrst);

};