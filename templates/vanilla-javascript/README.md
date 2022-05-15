# VeApp-React-Project

This project was created using [Create VeApp](https://github.com/hexdee/create-veapp).

## Quick Start

To run this project locally:

1. Prerequisites: Make sure you have a current Nodejs version and [Sync](https://sync.vecha.in/) installed
2. Install dependencies: `npm install`
3. Open `index.html` in your browser

Now you'll have a local development environment backed by the Vechain TestNet!

Go ahead and play with the app and the code!

## Exploring The Code

1. The backend code lives in the `/contract` folder, See `README.md` there for more info.
2. The frontend code lives in the `/index.html` and is a great place to start exploring.
3. `/index.js` is where the connection to Vechain and integration with smart contract is done

### Write your own smart contract

Write your smart contract in the `/contract/contracts` folder
Compile using `npx hardhat compile`

### Deploy contract

Create the script to deploy your smart contract in the /contract/scripts folder
Run the script using `node scripts/deploy.js`

### Set up integration in two-simple steps

1. Modify line 1 in `/index.js` that sets the contract address. Set it to the address your smart contract is deployed to above.

```javascript
const contractAddress = "0xF2ad5A9d8E20782E581875b7941911C20A45e73E";
```

2. You need your contract json file from `/contract/artifact` to access your smart contract funtions
3. Example code

```javascript
function increase() {
  const increaseABI = {
    inputs: [],
    name: "increase",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  };

  const increaseMethod = connex.thor
    .account(contractAddress)
    .method(increaseABI);

  const clause = increaseMethod.asClause();

  connex.vendor
    .sign("tx", [clause])
    .comment("transaction signing - increase count")
    .request()
    .then((r) => console.log(JSON.stringify(r, null, 4)))
    .catch((e) => console.log("error:" + e.message));
}
```

### Start the development server

```shell
npm start
```

Open `index.html` in your browser
