// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  // Setup accounts & variables
  const [deployer] = await ethers.getSigners()
  const NAME = "DotMantle"
  const SYMBOL = "DOTM"

  // Deploy contract
  const DotMantle = await ethers.getContractFactory("DotMantle")
  const dotMantle = await DotMantle.deploy(NAME, SYMBOL)
  await dotMantle.deployed();

  console.log(`Deployed Domain Contract at: ${dotMantle.address}\n`)

  // List domains
  const names = ["buybit.mantle","compareit.mantle", "better.mantle", "newyear.mantle", "google.mantle", "microsoft.mantle", "amazon.mantle", "facebook.mantle", "dotmantle.mantle", "oz.mantle","swap.mantle", "nft.mantle", "ebuy.mantle", "cobalt.mantle", "oxygen.mantle", "wall.mantle"]
  const costs = [tokens(35), tokens(15), tokens(23), tokens(5), tokens(100), tokens(100), tokens(90), tokens(95), tokens(100), tokens(111),tokens(5000), tokens(10000), tokens(3), tokens(35), tokens(23), tokens(111)]

  for (var i = 0; i < 16; i++) {
    const transaction = await dotMantle.connect(deployer).list(names[i], costs[i])
    await transaction.wait()

    console.log(`Listed Domain ${i + 1}: ${names[i]}`)
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
