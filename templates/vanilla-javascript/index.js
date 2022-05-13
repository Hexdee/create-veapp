const contractAddress = "0xF2ad5A9d8E20782E581875b7941911C20A45e73E" //Deployed contract address

const connex = new Connex({
    node: 'https://testnet.veblocks.net/',
    network: 'test'
})

const request = new XMLHttpRequest()
const ticker = connex.thor.ticker()

async function getCount() {

    const countABI = {
      "inputs": [],
      "name": "count",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
    await ticker.next()
    await connex.thor
    .account(contractAddress)
    .method(countABI)
    .call().then((res) => document.getElementById("count").innerText = Number(res.data))
    .catch((e) => console.log("error:" + e.message));
    console.log("next")
    getCount()
}

function increase() {

    const increaseABI = {
      "inputs": [],
      "name": "increase",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }

  const increaseMethod = connex.thor
    .account(contractAddress)
    .method(increaseABI);

  const clause = increaseMethod.asClause();

  connex.vendor
    .sign("tx", [clause])
    .comment("transaction signing - increase count")
    // .accepted(() => alert("accepted"))
    .request()
    .then((r) => (console.log(JSON.stringify(r, null, 4))))
    .catch((e) => console.log("error:" + e.message));
}

function decrease() {

    const decreaseABI = {
      "inputs": [],
      "name": "decrease",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }

  const decreaseMethod = connex.thor
    .account(contractAddress)
    .method(decreaseABI)

  const clause = decreaseMethod.asClause()

  connex.vendor
    .sign("tx", [clause])
    .comment("transaction signing - decrease count")
    // .accepted(() => alert("accepted"))
    .request()
    .then((r) => (console.log(JSON.stringify(r, null, 4))))
    .catch((e) => console.log("error:" + e.message));
}

function reset() {
  const resetABI = {
      "inputs": [],
      "name": "reset",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  }

  const resetMethod = connex.thor
  .account(contractAddress)
  .method(resetABI)

  const clause = resetMethod.asClause()

  connex.vendor
  .sign("tx", [clause])
  .comment("transaction signing - reset count")
  // .accepted(() => alert("accepted"))
  .request()
  .then((r) => (console.log(JSON.stringify(r, null, 4))))
  .catch((e) => console.log("error:" + e.message));
}

getCount()