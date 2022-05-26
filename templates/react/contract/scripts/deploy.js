// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy

  const Counter = await hre.thor.getContractFactory("Counter");
  const counter = await Counter.deploy();

  await counter.deployed();

  console.log("Counter deployed to:", counter.address);

  const deployedCounter = await hre.thor.getContractAt('Counter', counter.address)

  const count = await deployedCounter.count()
  console.log("Count is currently:", Number(count))

  await deployedCounter.increase()
  await deployedCounter.increase()
  const increased_count = await deployedCounter.count()
  console.log("After calling increase function twice, count is now:", Number(increased_count))

  await deployedCounter.decrease()
  const decreased_count = await deployedCounter.count()
  console.log("After calling decrease function, count is now:", Number(decreased_count))
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
