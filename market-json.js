module.exports = [
  {
    constant: true,
    inputs: [
      {
        name: "account",
        type: "address"
      }
    ],
    name: "get_account_liquidity",
    outputs: [
      {
        name: "",
        type: "int256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "requestedState",
        type: "bool"
      }
    ],
    name: "set_paused",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "asset",
        type: "address"
      },
      {
        name: "interest_rate_prototype",
        type: "address"
      }
    ],
    name: "support_market",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "asset",
        type: "address"
      },
      {
        name: "interest_rate_prototype",
        type: "address"
      }
    ],
    name: "set_market_interest_prototype",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "newPendingAdmin",
        type: "address"
      }
    ],
    name: "set_pending_admin",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    name: "collateral_markets",
    outputs: [
      {
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "address"
      },
      {
        name: "",
        type: "address"
      }
    ],
    name: "borrow_balances",
    outputs: [
      {
        name: "principal",
        type: "uint256"
      },
      {
        name: "interestIndex",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "asset",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    name: "borrow",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "paused",
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "asset",
        type: "address"
      }
    ],
    name: "asset_prices",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "liquidation_discount",
    outputs: [
      {
        name: "mantissa",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "address"
      },
      {
        name: "",
        type: "address"
      }
    ],
    name: "supply_balances",
    outputs: [
      {
        name: "principal",
        type: "uint256"
      },
      {
        name: "interestIndex",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "account",
        type: "address"
      },
      {
        name: "asset",
        type: "address"
      }
    ],
    name: "get_supply_balance",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "asset",
        type: "address"
      }
    ],
    name: "suspend_market",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "collateral_ratio",
    outputs: [
      {
        name: "mantissa",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "asset",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    name: "fund",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "asset",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    name: "withdraw_equity",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "asset",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    name: "repay_borrow",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "address"
      }
    ],
    name: "markets",
    outputs: [
      {
        name: "is_supported",
        type: "bool"
      },
      {
        name: "block_number",
        type: "uint256"
      },
      {
        name: "interest_rate_prototype",
        type: "address"
      },
      {
        name: "total_supply",
        type: "uint256"
      },
      {
        name: "supply_rate_mantissa",
        type: "uint256"
      },
      {
        name: "supply_index",
        type: "uint256"
      },
      {
        name: "total_borrows",
        type: "uint256"
      },
      {
        name: "borrow_rate_mantissa",
        type: "uint256"
      },
      {
        name: "borrow_index",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "origination_fee",
    outputs: [
      {
        name: "mantissa",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "targetAccount",
        type: "address"
      },
      {
        name: "assetBorrow",
        type: "address"
      },
      {
        name: "assetCollateral",
        type: "address"
      },
      {
        name: "requestedAmountClose",
        type: "uint256"
      }
    ],
    name: "liquidate_borrow",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "originationFeeMantissa",
        type: "uint256"
      }
    ],
    name: "set_origination_fee",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "newOracle",
        type: "address"
      }
    ],
    name: "set_oracle",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "get_collateral_markets_length",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "account",
        type: "address"
      },
      {
        name: "asset",
        type: "address"
      }
    ],
    name: "get_borrow_balance",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "userAddress",
        type: "address"
      }
    ],
    name: "calculate_account_values",
    outputs: [
      {
        name: "",
        type: "uint256"
      },
      {
        name: "",
        type: "uint256"
      },
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "collateralRatioMantissa",
        type: "uint256"
      },
      {
        name: "liquidationDiscountMantissa",
        type: "uint256"
      }
    ],
    name: "set_risk_parameters",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "accept_admin",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "pending_admin",
    outputs: [
      {
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "master",
    outputs: [
      {
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "asset",
        type: "address"
      },
      {
        name: "requestedAmount",
        type: "uint256"
      }
    ],
    name: "withdraw",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "admin",
    outputs: [
      {
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    payable: true,
    stateMutability: "payable",
    type: "fallback"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "account",
        type: "address"
      },
      {
        indexed: false,
        name: "asset",
        type: "address"
      },
      {
        indexed: false,
        name: "amount",
        type: "uint256"
      },
      {
        indexed: false,
        name: "startingBalance",
        type: "uint256"
      },
      {
        indexed: false,
        name: "newBalance",
        type: "uint256"
      }
    ],
    name: "SupplyReceived",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "account",
        type: "address"
      },
      {
        indexed: false,
        name: "asset",
        type: "address"
      },
      {
        indexed: false,
        name: "amount",
        type: "uint256"
      },
      {
        indexed: false,
        name: "startingBalance",
        type: "uint256"
      },
      {
        indexed: false,
        name: "newBalance",
        type: "uint256"
      }
    ],
    name: "SupplyWithdrawn",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "account",
        type: "address"
      },
      {
        indexed: false,
        name: "asset",
        type: "address"
      },
      {
        indexed: false,
        name: "amount",
        type: "uint256"
      },
      {
        indexed: false,
        name: "startingBalance",
        type: "uint256"
      },
      {
        indexed: false,
        name: "borrowAmountWithFee",
        type: "uint256"
      },
      {
        indexed: false,
        name: "newBalance",
        type: "uint256"
      }
    ],
    name: "BorrowTaken",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "account",
        type: "address"
      },
      {
        indexed: false,
        name: "asset",
        type: "address"
      },
      {
        indexed: false,
        name: "amount",
        type: "uint256"
      },
      {
        indexed: false,
        name: "startingBalance",
        type: "uint256"
      },
      {
        indexed: false,
        name: "newBalance",
        type: "uint256"
      }
    ],
    name: "BorrowRepaid",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "targetAccount",
        type: "address"
      },
      {
        indexed: false,
        name: "assetBorrow",
        type: "address"
      },
      {
        indexed: false,
        name: "borrowBalanceBefore",
        type: "uint256"
      },
      {
        indexed: false,
        name: "borrowBalanceAccumulated",
        type: "uint256"
      },
      {
        indexed: false,
        name: "amountRepaid",
        type: "uint256"
      },
      {
        indexed: false,
        name: "borrowBalanceAfter",
        type: "uint256"
      },
      {
        indexed: false,
        name: "liquidator",
        type: "address"
      },
      {
        indexed: false,
        name: "assetCollateral",
        type: "address"
      },
      {
        indexed: false,
        name: "collateralBalanceBefore",
        type: "uint256"
      },
      {
        indexed: false,
        name: "collateralBalanceAccumulated",
        type: "uint256"
      },
      {
        indexed: false,
        name: "amountSeized",
        type: "uint256"
      },
      {
        indexed: false,
        name: "collateralBalanceAfter",
        type: "uint256"
      }
    ],
    name: "BorrowLiquidated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "oldPendingAdmin",
        type: "address"
      },
      {
        indexed: false,
        name: "newPendingAdmin",
        type: "address"
      }
    ],
    name: "NewPendingAdmin",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "oldAdmin",
        type: "address"
      },
      {
        indexed: false,
        name: "newAdmin",
        type: "address"
      }
    ],
    name: "NewAdmin",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "oldOracle",
        type: "address"
      },
      {
        indexed: false,
        name: "newOracle",
        type: "address"
      }
    ],
    name: "NewOracle",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "asset",
        type: "address"
      },
      {
        indexed: false,
        name: "interest_rate_prototype",
        type: "address"
      }
    ],
    name: "SupportedMarket",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "oldCollateralRatioMantissa",
        type: "uint256"
      },
      {
        indexed: false,
        name: "newCollateralRatioMantissa",
        type: "uint256"
      },
      {
        indexed: false,
        name: "oldLiquidationDiscountMantissa",
        type: "uint256"
      },
      {
        indexed: false,
        name: "newLiquidationDiscountMantissa",
        type: "uint256"
      }
    ],
    name: "NewRiskParameters",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "oldOriginationFeeMantissa",
        type: "uint256"
      },
      {
        indexed: false,
        name: "newOriginationFeeMantissa",
        type: "uint256"
      }
    ],
    name: "NewOriginationFee",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "asset",
        type: "address"
      },
      {
        indexed: false,
        name: "interest_rate_prototype",
        type: "address"
      }
    ],
    name: "SetMarketInterestRateModel",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "asset",
        type: "address"
      },
      {
        indexed: false,
        name: "equityAvailableBefore",
        type: "uint256"
      },
      {
        indexed: false,
        name: "amount",
        type: "uint256"
      },
      {
        indexed: false,
        name: "owner",
        type: "address"
      }
    ],
    name: "EquityWithdrawn",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "asset",
        type: "address"
      }
    ],
    name: "SuspendedMarket",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "newState",
        type: "bool"
      }
    ],
    name: "SetPaused",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "flaw",
        type: "uint256"
      },
      {
        indexed: false,
        name: "data",
        type: "uint256"
      },
      {
        indexed: false,
        name: "detail",
        type: "uint256"
      }
    ],
    name: "Downhilled",
    type: "event"
  }
];
