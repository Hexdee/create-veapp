# VeApp-React-Project

This project was created using [Create VeApp](https://github.com/hexdee/create-veapp).

## Quick Start

To run this project locally:

1. Install dependencies: `npm install`
2. Run the development server: `npm start`

Now you'll have a local development environment backed by the Vechain TestNet!

Go ahead and play with the app and the code!

## Exploring The Code

1. The backend code lives in the `/contract` folder, See `README.md` there for more info.
2. The frontend code lives in the `/src` folder. `/src/App.js` is a great place to start exploring.
3. `/src/config` is where the connection to Vechain and integration with smart contract is done

### Write your own smart contract

Write your smart contract in the `/contract/contracts` folder
Compile using `npx hardhat compile`

### Deploy contract

Create the script to deploy your smart contract in the /contract/scripts folder
Run the script using `node scripts/{your_script.js}`

### Set up integration in two-simple steps

1. Modify line 9 in `/src/config/connex.js` that sets the contract address. Set it to the address your smart contract is deployed to above.

```javascript
export const contractAddress =
  process.env.CONTRACTADDRESS || "0xF2ad5A9d8E20782E581875b7941911C20A45e73E";
```

2. Copy your contract json file from `/contract/artifact` to `/src/config/contract.json`

3. You can now access your smart contract functions through the `Contract` object by importing it from `/src/connex.js`
   E.g

```javascript
import { Contract } from "/config/connex";

// View function
let greeting = Contract.getGreeting();
console.log(greeting);

// Call function(with parameter)
Contract.setGreeting("Hello World");
```

### Start the development server

```shell
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
