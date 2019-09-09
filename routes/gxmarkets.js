/*
 * gx money markets route
 * author : Saileela Puvvada
 */

var authenticate = require('../middleware/authenticate');
var userData = require('../models/user_data');
var aprData = require('../models/apr_data');
var Transcations = require('../models/transaction');
var Withdrawl = require('../models/withdrawl');
var createGxmmMarket = (req, res) => {
    userData.findOne({ user_eth_addr: req.body.user_eth_addr.toLowerCase() }, function (err, user_found) {
        var query = {
            user_eth_addr: req.body.user_eth_addr.toLowerCase(),
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
                    res.send({ status: "success", message: user_saved });
                } else {
                    res.send({ status: "failure", message: "something wrong in saving user data" });
                }
            });
        } else {
            userData.update(query).exec(function (err, user_updated) {
                if (user_updated) {
                    res.send({ status: "success", updated: user_updated, message: "Updated Succesfully" });
                } else {
                    res.send({ status: "failure", message: "something wrong in updating user data" });
                }
            });

        }
    });
}

var getGxmmMarkets = (req, res) => {
    userData.find({ $and: [{ user_eth_addr: req.body.user_eth_addr.toLowerCase(), 'markets.name': req.body.market_name }] }, { 'markets.name': 1, _id: 0 }).exec(function (err, docs) {
        if (err) {
            res.send(false);
            console.log(err);
        } else {
            console.log(docs);
            docs.length > 0 ? res.send({ status: "success", message: docs }) : res.send('Disabled');
        }
    });
};

var gxmmWithdrawRequest = (req, res) => {
    Withdrawl.find({}).exec(function (err, withdraw_request) {
        if (withdraw_request) {
            var withdraw_req = new Withdrawl(req.body);
            withdraw_req.save(function (err, withdraw_req_saved) {
                if (withdraw_req_saved) {
                    res.send({ status: "success", message: withdraw_req_saved });
                } else {
                    res.send({ status: "failure", message: "withdraw_req not saved" });
                }
            })
        } else {
            res.send({ status: "failure", message: "Data not enetered" })
        }
    });
};

var getGxmmWithdrawls = (req, res) => {
    Withdrawl.find({ user_eth_addr: req.body.user_eth_addr.toLowerCase() }).exec(function (err, docs) {
        if (!docs) {
            res.send({ status: "failure" });
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
            res.send({ status: "success", pending: pending_withdrawals, partial: partial_withdrawals, completed: completed_withdrawals });
        }
    });
};

var saveTransaction = (req, res) => {
    Transcations.find({}).exec(function (err, transactions) {
        if (transactions) {
            var saveTransaction = new Transcations(req.body);
            saveTransaction.save(function (err, transaction_saved) {
                if (transaction_saved) {
                    res.send({ status: "success", message: transaction_saved });
                } else {
                    res.send({ status: "failure", message: "Something wrong in saving transcation" });
                }
            });
        } else {
            res.send({ status: "failure", message: err });
        }
    });
};

var getGxmmTransctions = (req, res) => {
    var query = {
        user_eth_addr: req.body.user_eth_addr.toLowerCase(),
        market_name: req.body.market_name
    }
    Transcations.find(query).exec(function (err, docs) {
        if (docs) {
            res.send({ status: "success", message: docs });

        } else {
            res.send({ status: "failure", message: "No transcations found" });
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
            res.send({ status: "success", pending: pending_withdrawals, partial: partial_withdrawals, completed: completed_withdrawals });
        } else {

        }
    });
};

var gxmmUpdateWithdrawl = async (req, res) => {
    let obj = {};
    if (req.body.Id != undefined || req.body.Id != "" || req.body.Id != null) {
        if (req.body.user_eth_addr != null)
            obj.user_eth_addr = req.body.user_eth_addr.toLowerCase();
        if (req.body.available_withdraw_amount != null)
            obj.available_withdraw_amount = req.body.available_withdraw_amount;
        try {
            await Withdrawl.findOneAndUpdate({ _id: req.body.Id }, { $set: obj }).exec(function (err, updated) {
                if (updated) {
                    res.json({
                        status: "success",
                        message: 'Successfully Updated',
                        records: updated
                    });
                } else {
                    res.send({ status: "failure", message: err });
                }
            });
        } catch (error) {
            res.json({ status: "failure", message: toString(error.message) });
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
                    status: "success",
                    message: 'Successfully Updated',
                    records: updated
                });
            } else {
                res.json({
                    status: "failure",
                    message: 'Not updated'
                });
            }
        });
    } else {
        res.json({
            status: "failure",
            message: 'Please send the Id and The status'
        });
    }
};

var gxmmTest = (req, res) => {
    res.send('hello from gxmm server');
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
    router.post('/test', gxmmTest);
};