// const cron = require('node-cron');
// const dotenv = require('dotenv');
// let market_json = require('./market-json');
// let configAuth = require('./config')();
// dotenv.config();
// let axios = require('axios');
// const EthereumTx = require('ethereumjs-tx');
// const Web3 = require('web3');
// let aprData = require('./models/apr_data');

// let endpoint;
// if (process.env.NODE_ENV === 'production') {
//   endpoint = configAuth.PRODUCTION;
// } else {
//   endpoint = configAuth.PRODUCTION;
// }

// let web3 = new Web3(new Web3.providers.HttpProvider(endpoint));

// let market_contract = new web3.eth.Contract(
//   market_json,
//   process.env.gxmm_contract_addres
// );
// let assets = ['bat', 'dai', 'eth', 'rep', 'usdc', 'zrx', 'gxt'];

// const asyncForEach = async (array, callback) => {
//   for (let index = 0; index < array.length; index++) {
//     await callback(array[index], index, array);
//   }
// };
// //0 0 */2 * * *
// cron.schedule('0 0 */1 * * * ', async () => {

// });

// cron.schedule('0 0 */12 * * *', async () => {

// });

// var apiTest2 = async () => {
//   let markets_data = [];

//   await asyncForEach(configAuth.mainnet_addresses, async market => {
//     let temp_market = await market_contract.methods.markets(market).call();
//     temp_market['market_address'] = market;
//     markets_data.push(temp_market);
//   });
//   let apr_data = [];
//   let p = 0;
//   markets_data.map(market => {
//     p++;
//     let temp_obj = {};
//     let ts = Date.now();
//     var options = {
//       timeZone: 'America/New_York'
//     },
//       estTime = new Date(ts);
//     let date = estTime.toLocaleString('en-US', options);

//     if (market.market_address.toLowerCase() == configAuth.mainnet_addresses[0].toLowerCase()) {
//       temp_obj['market_name'] = 'BAT';
//       temp_obj['ts'] = ts;
//       temp_obj['date'] = date;
//       temp_obj['supply_apr'] = (
//         ((market.supply_rate_mantissa * 2102400) / 10 ** 18) *
//         100
//       ).toPrecision(10);

//       temp_obj['borrow_apr'] = (
//         ((market.borrow_rate_mantissa * 2102400) / 10 ** 18) *
//         100
//       ).toPrecision(10);
//       apr_data.push(temp_obj);
//     } else if (market.market_address.toLowerCase() == configAuth.mainnet_addresses[1].toLowerCase()) {
//       temp_obj['market_name'] = 'DAI';
//       temp_obj['ts'] = ts;
//       temp_obj['date'] = date;

//       temp_obj['supply_apr'] = (
//         ((market.supply_rate_mantissa * 2102400) / 10 ** 18) *
//         100
//       ).toPrecision(10);

//       temp_obj['borrow_apr'] = (
//         ((market.borrow_rate_mantissa * 2102400) / 10 ** 18) *
//         100
//       ).toPrecision(10);
//       apr_data.push(temp_obj);
//     } else if (
//       market.market_address.toLowerCase() == configAuth.mainnet_addresses[2].toLowerCase()
//     ) {
//       temp_obj['market_name'] = 'WETH';
//       temp_obj['ts'] = ts;
//       temp_obj['date'] = date;

//       temp_obj['supply_apr'] = (
//         ((market.supply_rate_mantissa * 2102400) / 10 ** 18) *
//         100
//       ).toPrecision(10);

//       temp_obj['borrow_apr'] = (
//         ((market.borrow_rate_mantissa * 2102400) / 10 ** 18) *
//         100
//       ).toPrecision(10);
//       apr_data.push(temp_obj);
//     } else if (
//       market.market_address.toLowerCase() == configAuth.mainnet_addresses[3].toLowerCase()
//     ) {
//       temp_obj['market_name'] = 'REP';
//       temp_obj['ts'] = ts;
//       temp_obj['date'] = date;

//       temp_obj['supply_apr'] = (
//         ((market.supply_rate_mantissa * 2102400) / 10 ** 18) *
//         100
//       ).toPrecision(10);

//       temp_obj['borrow_apr'] = (
//         ((market.borrow_rate_mantissa * 2102400) / 10 ** 18) *
//         100
//       ).toPrecision(10);
//       apr_data.push(temp_obj);
//     } else if (
//       market.market_address.toLowerCase() == configAuth.mainnet_addresses[4].toLowerCase()
//     ) {
//       temp_obj['market_name'] = 'USDC';
//       temp_obj['ts'] = ts;
//       temp_obj['date'] = date;

//       temp_obj['supply_apr'] = (
//         ((market.supply_rate_mantissa * 2102400) / 10 ** 18) *
//         100
//       ).toPrecision(10);

//       temp_obj['borrow_apr'] = (
//         ((market.borrow_rate_mantissa * 2102400) / 10 ** 18) *
//         100
//       ).toPrecision(10);
//       apr_data.push(temp_obj);
//     } else if (
//       market.market_address.toLowerCase() == configAuth.mainnet_addresses[5].toLowerCase()
//     ) {
//       temp_obj['market_name'] = 'ZRX';
//       temp_obj['ts'] = ts;
//       temp_obj['date'] = date;

//       temp_obj['supply_apr'] = (
//         ((market.supply_rate_mantissa * 2102400) / 10 ** 18) *
//         100
//       ).toPrecision(10);

//       temp_obj['borrow_apr'] = (
//         ((market.borrow_rate_mantissa * 2102400) / 10 ** 18) *
//         100
//       ).toPrecision(10);
//       apr_data.push(temp_obj);
//     } else {
//       temp_obj['market_name'] = 'GXT';
//       temp_obj['ts'] = ts;
//       temp_obj['date'] = date;

//       temp_obj['supply_apr'] = (
//         ((market.supply_rate_mantissa * 2102400) / 10 ** 18) *
//         100
//       ).toPrecision(10);

//       temp_obj['borrow_apr'] = (
//         ((market.borrow_rate_mantissa * 2102400) / 10 ** 18) *
//         100
//       ).toPrecision(10);
//       apr_data.push(temp_obj);
//     }
//   });

//   aprData.insertMany([...apr_data]).then(() => {
//   });
// }

// var apiTest1 = async () =>{
//   // let apple = async () => {
//   // ────────────────────────────────────────────────────────────────────────────────
//   //@notice for async foreach
//   let process_flag = true;

//   let i;

//   let old_prices = [];
//   let cc_prices = [];
//   let cmc_prices = [];
//   let new_prices = [];

//   let pwda = []; //array to store the assets whose price went down
//   let pwua = []; //array to store the assets whose price went up
//   let pnc = []; //array to store the assets whose price remained stable

//   // ────────────────────────────────────────────────────────────────────────────────

//   const get_prices = async () => {
//     let i = 0;
//     // ────────────────────────────────────────────────────────────────────────────────
//     let cc_res = await axios.get(
//       configAuth.cryptocompare
//     );
//     //console.log(cc_res.data);
//     Object.keys(cc_res.data).forEach(key => {
//       cc_prices = [...cc_prices, cc_res.data[key].USD];
//     });

//     let cmc_res = await axios.get(
//       configAuth.ccxtcompare
//     );
//     cmc_prices = cmc_res.data.Data.map(e =>
//       parseFloat(Number(e.price).toFixed(3))
//     );
//     console.log(cmc_prices);
//     //new_prices = [0.386, 0.888, 218.696, 10.931, 0.998, 200.0];
//     for (i = 0; i < cc_prices.length; i++) {
//       new_prices = [
//         ...new_prices,
//         Math.round(((cc_prices[i] + cmc_prices[i]) / 2) * 1000) / 1000
//       ];
//       if (i == cc_prices.length - 1) {
//         let gxt_price = new_prices[2] * 0.0054;
//         new_prices.push(Math.round(gxt_price * 1000) / 1000);
//       }
//     }

//     console.log(new_prices);

//     // ────────────────────────────────────────────────────────────────────────────────
//     await asyncForEach(configAuth.mainnet_addresses, async market => {
//       console.log('#######################################');
//       console.log(market);
//       let temp = await market_contract.methods.asset_prices(market).call();
//       temp = parseFloat(Number(temp / 1000).toFixed(3));
//       //console.log(market);
//       old_prices = [...old_prices, temp];
//     });

//     i = 0;
//     console.log(old_prices);

//     const privateKey = Buffer.from(process.env.private_key, 'hex');
//     console.log('Inside...........', privateKey);
//     const eth_addr = process.env.eth_addr;
//     var ct = await web3.eth.getTransactionCount(eth_addr);
//     console.log(i);

//     let five_price_data = web3.eth.abi.encodeFunctionCall(
//       {
//         name: 'set5assetprice',
//         type: 'function',
//         inputs: [
//           {
//             type: 'address',
//             name: 'hgfjh'
//           },
//           {
//             type: 'uint256',
//             name: 'ahfdhmt'
//           },
//           {
//             type: 'address',
//             name: 'hgfjh'
//           },
//           {
//             type: 'uint256',
//             name: 'ahfdhmt'
//           },
//           {
//             type: 'address',
//             name: 'hgfjh'
//           },
//           {
//             type: 'uint256',
//             name: 'ahfdhmt'
//           },
//           {
//             type: 'address',
//             name: 'hgfjh'
//           },
//           {
//             type: 'uint256',
//             name: 'ahfdhmt'
//           },
//           {
//             type: 'address',
//             name: 'hgfjh'
//           },
//           {
//             type: 'uint256',
//             name: 'ahfdhmt'
//           }
//         ]
//       },
//       [
//         configAuth.mainnet_addresses[0],
//         Math.round(new_prices[0] * 1000),
//         configAuth.mainnet_addresses[1],
//         Math.round(new_prices[1] * 1000),
//         configAuth.mainnet_addresses[2],
//         Math.round(new_prices[2] * 1000),
//         configAuth.mainnet_addresses[3],
//         Math.round(new_prices[3] * 1000),
//         configAuth.mainnet_addresses[4],
//         Math.round(new_prices[4] * 1000)
//       ]
//     );

//     // console.log(Tdata);

//     const txParams = {
//       nonce: ct,
//       gasPrice: web3.utils.toHex(5000000000),
//       gasLimit: web3.utils.toHex(80000),
//       to: process.env.gxmm_price_master,
//       data: five_price_data,
//       chainId: 1
//     };

//     const tx = new EthereumTx(txParams);
//     tx.sign(privateKey);
//     var serializedTx = `0x${tx.serialize().toString('hex')}`;
//     //console.log(serializedTx);

//     await web3.eth.sendSignedTransaction(serializedTx, (err, res) => {
//       if (!err) {
//         console.log('Txn_hash.........: ' + res);
//       } else {
//         console.log(err);
//       }
//     });
//     // ─────────────────────────────────────────────────────────────────
//     // ────────────────────────────────────────────────────────────────────────────────

//     let two_price_data = web3.eth.abi.encodeFunctionCall(
//       {
//         name: 'set2assetprice',
//         type: 'function',
//         inputs: [
//           {
//             type: 'address',
//             name: 'hgfjh'
//           },
//           {
//             type: 'uint256',
//             name: 'ahfdhmt'
//           },
//           {
//             type: 'address',
//             name: 'hgfjh'
//           },
//           {
//             type: 'uint256',
//             name: 'ahfdhmt'
//           }
//         ]
//       },
//       [
//         configAuth.mainnet_addresses[5],
//         Math.round(new_prices[5] * 1000),
//         configAuth.mainnet_addresses[6],
//         Math.round(new_prices[6] * 1000)
//       ]
//     );

//     // console.log(Tdata);

//     const txParams1 = {
//       nonce: ct + 1,
//       gasPrice: web3.utils.toHex(5000000000),
//       gasLimit: web3.utils.toHex(80000),
//       to: process.env.gxmm_price_master,
//       data: two_price_data,
//       chainId: 1
//     };

//     const tx1 = new EthereumTx(txParams1);
//     tx1.sign(privateKey);
//     var serializedTx1 = `0x${tx1.serialize().toString('hex')}`;
//     //console.log(serializedTx);

//     await web3.eth.sendSignedTransaction(serializedTx1, (err, res) => {
//       if (!err) {
//         console.log('Txn_hash.........: ' + res);
//       } else {
//         console.log(err);
//       }
//     });

//     console.log('Done');

//     // ─────────────────────────────────────────────────────────────────
//     for (i = 0; i < assets.length; i++) {
//       if (old_prices[i] > new_prices[i]) {
//         pwda = [
//           ...pwda,
//           {
//             market: assets[i],
//             market_addr: configAuth.mainnet_addresses[i],
//             old_price: Math.round(old_prices[i] * 1000) / 1000,
//             new_price: Math.round(new_prices[i] * 1000) / 1000,
//             price_delta:
//               Math.round((old_prices[i] - new_prices[i]) * 1000) / 1000
//           }
//         ];
//       } else if (old_prices[i] < new_prices[i]) {
//         pwua = [
//           ...pwua,
//           {
//             market: assets[i],
//             market_addr: configAuth.mainnet_addresses[i],
//             old_price: Math.round(old_prices[i] * 1000) / 1000,
//             new_price: Math.round(new_prices[i] * 1000) / 1000,
//             price_delta:
//               Math.round((new_prices[i] - old_prices[i]) * 1000) / 1000
//           }
//         ];
//       } else {
//         pnc = [
//           ...pnc,
//           {
//             market: assets[i],
//             market_addr: configAuth.mainnet_addresses[i],
//             old_price: Math.round(old_prices[i] * 1000) / 1000,
//             new_price: Math.round(new_prices[i] * 1000) / 1000,
//             price_delta:
//               Math.round((new_prices[i] - old_prices[i]) * 1000) / 1000
//           }
//         ];
//       }
//     }

//     console.log(pwda);
//     console.log(pwua);
//     console.log(pnc);
//   };
//   // ────────────────────────────────────────────────────────────────────────────────
//   // ────────────────────────────────────────────────────────────────────────────────

//   const eth_addr = process.env.eth_addr;
//   let tc = await web3.eth.getTransactionCount(eth_addr);

//   const do_processing = async () => {
//     //getting all the users
//     let users = await db
//       .collection('user_data')
//       .find({})
//       .project({
//         user_eth_addr: 1,
//         _id: 0
//       })
//       .toArray();
//     users = users.map(e => e.user_eth_addr);
//     console.log(users);

//     let liquidity;
//     let negative_liq_users = [];
//     await asyncForEach(users, async user => {
//       let res = await market_contract.methods
//         .get_account_liquidity(user)
//         .call();
//       liquidity = res / 1000;
//       if (liquidity < 0) {
//         negative_liq_users.push(user);
//       }
//     });
//     console.log('finalyy');
//     console.log(negative_liq_users);
//     if (negative_liq_users.length == 0) {
//       process_flag = false;
//       console.log('No users to be liquidated');
//       return;
//     }

//     let tbl_users = [];

//     //checking supply and borrow balances for each user
//     // ─────────────────────────────────────────────────────────────────

//     await asyncForEach(negative_liq_users, async user => {
//       let temp_user_data = {
//         user: user,
//         pwd_sup_assets: [],
//         pwu_bor_assets: [],
//         pnc_assets: [],
//         choosed_collateral_asset: 'not_found',
//         choosed_borrowing_asset: 'not_found'
//       };

//       //setting pwd_sup_assets array inside user object
//       await asyncForEach(pwda, async asset => {
//         let newsupbal = await market_contract.methods
//           .get_supply_balance(user, asset.market_addr)
//           .call();
//         let newsupval = Number(
//           ((parseFloat(newsupbal) / 10 ** 18) * asset.new_price).toFixed(8)
//         );
//         if (newsupval > 0) {
//           let oldsupbal = await market_contract.methods
//             .supply_balances(user, asset.market_addr)
//             .call();
//           oldsupbal = oldsupbal['0'];
//           let oldsupval = Number(
//             ((parseFloat(oldsupbal) / 10 ** 18) * asset.old_price).toFixed(8)
//           );
//           let temp_supp_data = {
//             market: asset.market,
//             market_addr: asset.market_addr,
//             newsupval: newsupval,
//             oldsupval: oldsupval,
//             delta_sup: oldsupval - newsupval
//           };
//           temp_user_data.pwd_sup_assets.push(temp_supp_data);
//         }
//       });

//       //setting pwu_bor_assets array inside user object
//       await asyncForEach(pwua, async asset => {
//         let newborbal = await market_contract.methods
//           .get_borrow_balance(user, asset.market_addr)
//           .call();
//         let newborval = Number(
//           ((parseFloat(newborbal) / 10 ** 18) * asset.new_price).toFixed(8)
//         );
//         if (newborval > 0) {
//           let oldborbal = await market_contract.methods
//             .borrow_balances(user, asset.market_addr)
//             .call();
//           oldborbal = oldborbal['0'];
//           let oldborval = Number(
//             ((parseFloat(oldborbal) / 10 ** 18) * asset.old_price).toFixed(8)
//           );
//           let temp_borr_data = {
//             market: asset.market,
//             market_addr: asset.market_addr,
//             newborval: newborval,
//             oldborval: oldborval,
//             delta_bor: newborval - oldborval
//           };
//           temp_user_data.pwu_bor_assets.push(temp_borr_data);
//         }
//       });

//       //setting pnc_assets array inside user object
//       await asyncForEach(pnc, async asset => {
//         let newborbal = await market_contract.methods
//           .get_borrow_balance(user, asset.market_addr)
//           .call();
//         let newborval = Number(
//           ((parseFloat(newborbal) / 10 ** 18) * asset.new_price).toFixed(8)
//         );
//         let oldborbal = await market_contract.methods
//           .borrow_balances(user, asset.market_addr)
//           .call();
//         oldborbal = oldborbal['0'];
//         let oldborval = Number(
//           ((parseFloat(oldborbal) / 10 ** 18) * asset.old_price).toFixed(8)
//         );
//         let newsupbal = await market_contract.methods
//           .get_supply_balance(user, asset.market_addr)
//           .call();
//         let newsupval = Number(
//           ((parseFloat(newsupbal) / 10 ** 18) * asset.new_price).toFixed(8)
//         );
//         let oldsupbal = await market_contract.methods
//           .supply_balances(user, asset.market_addr)
//           .call();
//         oldsupbal = oldsupbal['0'];
//         let oldsupval = Number(
//           ((parseFloat(oldsupbal) / 10 ** 18) * asset.old_price).toFixed(8)
//         );

//         let temp_borr_data = {
//           market: asset.market,
//           market_addr: asset.market_addr,
//           newborval: newborval,
//           oldborval: oldborval,
//           newsupval: newsupval,
//           oldsupval: oldsupval,
//           delta_bor: newborval - oldborval,
//           delta_sup: newsupval - oldsupval
//         };
//         if (oldsupval > 0 || oldborval > 0 || newsupval > 0 || newborval > 0)
//           temp_user_data.pnc_assets.push(temp_borr_data);
//       });

//       tbl_users = [...tbl_users, temp_user_data];
//     });

//     console.log('************************************');
//     tbl_users.map(j => console.log(j.pwd_sup_assets));
//     console.log('************************************');
//     tbl_users.map(j => console.log(j.pwu_bor_assets));
//     console.log('************************************');
//     tbl_users.map(j => console.log(j.pnc_assets));
//     console.log('************************************');

//     //setting collateral and borrowing asset address
//     // ─────────────────────────────────────────────────────────────────
//     tbl_users.map(e => {
//       let max_sup_delta;
//       let index_collateral;
//       //finding max_sup_delta and choosing the collateral asset
//       if (e.pwd_sup_assets.length > 0) {
//         max_sup_delta = Math.max(...e.pwd_sup_assets.map(o => o.delta_sup), 0);
//         index_collateral = e.pwd_sup_assets.findIndex(
//           s => s.delta_sup == max_sup_delta
//         );
//         e.choosed_collateral_asset =
//           e.pwd_sup_assets[index_collateral].market_addr;
//       } else if (e.pnc_assets.length > 0) {
//         max_sup_delta = Math.max(...e.pnc_assets.map(o => o.delta_sup), 0);
//         index_collateral = e.pnc_assets.findIndex(
//           s => s.delta_sup == max_sup_delta
//         );
//         e.choosed_collateral_asset = e.pnc_assets[index_collateral].market_addr;
//       } else {
//       }
//       let max_bor_delta;
//       let index_borrow;
//       if (e.pwu_bor_assets.length > 0) {
//         max_bor_delta = Math.max(...e.pwu_bor_assets.map(o => o.delta_bor), 0);
//         index_borrow = e.pwu_bor_assets.findIndex(
//           s => s.delta_bor == max_bor_delta
//         );
//         e.choosed_borrowing_asset = e.pwu_bor_assets[index_borrow].market_addr;
//       } else if (e.pnc_assets.length > 0) {
//         max_bor_delta = Math.max(...e.pnc_assets.map(o => o.delta_bor), 0);
//         index_borrow = e.pnc_assets.findIndex(
//           s => s.delta_bor == max_bor_delta
//         );
//         e.choosed_borrowing_asset = e.pnc_assets[index_borrow].market_addr;
//       } else {
//       }

//     });
//     // ─────────────────────────────────────────────────────────────────

//     tbl_users.map(e => console.log(e.choosed_collateral_asset));
//     console.log('************************************');

//     tbl_users.map(e => console.log(e.choosed_borrowing_asset));
//     console.log('************************************');

//     // ─────────────────────────────────────────────────────────────────
//     await asyncForEach(negative_liq_users, async user => {
//       let target_account = user;
//       let index = tbl_users.findIndex(s => s.user == target_account);
//       let borrowing_asset = tbl_users[index].choosed_borrowing_asset;
//       let collateral_asset = tbl_users[index].choosed_collateral_asset;
//       let amount =
//         '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
//       // ─────────────────────────────────────────────────────────────────
//       if (collateral_asset !== 'not_found') {
//         const privateKey = Buffer.from(process.env.private_key, 'hex');
//         console.log('Inside...........', privateKey);

//         let Tdata = web3.eth.abi.encodeFunctionCall(
//           {
//             name: 'liquidate_borrow',
//             type: 'function',
//             inputs: [
//               {
//                 type: 'address',
//                 name: 'hgfjh'
//               },
//               {
//                 type: 'address',
//                 name: 'hgdfh'
//               },
//               {
//                 type: 'address',
//                 name: 'gdfh'
//               },
//               {
//                 type: 'uint256',
//                 name: 'ahfdhmt'
//               }
//             ]
//           },
//           [target_account, borrowing_asset, collateral_asset, amount]
//         );

//         const txParams = {
//           nonce: tc++,
//           gasPrice: web3.utils.toHex(5000000000),
//           gasLimit: web3.utils.toHex(80000),
//           to: process.env.gxmm_contract_addres,
//           data: Tdata,
//           chainId: 1
//         };

//         const tx = new EthereumTx(txParams);
//         tx.sign(privateKey);
//         var serializedTx = `0x${tx.serialize().toString('hex')}`;
//         //console.log(serializedTx);

//         await web3.eth.sendSignedTransaction(serializedTx, (err, res) => {
//           if (!err) {
//             console.log('Txn_hash.........: ' + res);
//             db.collection('auto_liquidation').insertOne({
//               target_account,
//               borrowing_asset,
//               collateral_asset,
//               timestamp: Date.now(),
//               txn_hash: res
//             });
//           } else {
//             db.collection('auto_liquidation').insertOne({
//               target_account,
//               borrowing_asset,
//               collateral_asset,
//               timestamp: Date.now(),
//               txn_hash: res,
//               error: err
//             });
//             console.log(err);
//           }
//         });
//       } else {
//         return;
//       }
//     });
//   };

//   await get_prices();

//   for (let j = 0; j < 5; j++) {
//     console.log('inside for loop');
//     if (process_flag) await do_processing();
//   }
// }


