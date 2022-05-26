import Connex from '@vechain/connex'
import contract from './contract.json'

export const connex = new Connex({
    node: 'https://testnet.veblocks.net/',
    network: 'test'
})

export const contractAddress = process.env.CONTRACTADDRESS || "0xF2ad5A9d8E20782E581875b7941911C20A45e73E"

// Creating the Contract object from abi for easy method calls
export let Contract = {}

contract.abi.forEach(method => {
  if (!method.name || method.type !== 'function') {
    return
  }

  if (method.stateMutability === "view") {
    Contract[method.name] = defineConstant(method)
  } else {
    Contract[method.name] = defineSignedRequest(method)
  }
})

function defineConstant (method) {
  return (...args) => connex.thor.account(contractAddress).method(method).call(...args)
   .catch((e) => console.log("error:" + e.message));
}

function defineSignedRequest (method) {
  return async (...args) => {
    const clause = connex.thor.account(contractAddress).method(method).asClause(...args)
    const signingService = connex.vendor.sign('tx', [clause])

    const transactionInfo = await signingService
    .comment(`transaction signing - ${method.name}`)
    .request()
    .then((r) => (console.log(JSON.stringify(r, null, 4))))
    .catch((e) => console.log("error:" + e.message));

    return transactionInfo
  }
}


export const request = new XMLHttpRequest()
export const ticker = connex.thor.ticker()
