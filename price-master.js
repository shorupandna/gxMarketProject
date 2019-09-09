module.exports = [
  {
    constant: false,
    inputs: [
      {
        name: "asset",
        type: "address"
      },
      {
        name: "price",
        type: "uint256"
      }
    ],
    name: "set_single_asset_price",
    outputs: [
      {
        name: "",
        type: "bool"
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
  }
];
