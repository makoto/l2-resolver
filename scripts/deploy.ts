import { ethers } from "hardhat";
import packet from "dns-packet"

function encodeName(name) {
  return '0x' + packet.name.encode(name).toString('hex')
}
async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = ethers.utils.parseEther("0.001");

  const Lock = await ethers.getContractFactory("Lock");
  const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  await lock.deployed();

  console.log(
    `Lock with ${ethers.utils.formatEther(lockedAmount)}ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  );
  console.log('***1')
  const L2PublicResolverFactory = await ethers.getContractFactory("L2PublicResolver");
  console.log('***2')
  const resolver = await L2PublicResolverFactory.deploy();
  console.log('***3')
  await resolver.deployed();
  console.log('***4')
  const node = "0x80ee077a908dffcf32972ba13c2df16b42688e1de21bcf17d3469a8507895eae"
  const address = "0x5a384227b65fa093dec03ec34e111db80a040615"
  const address2 = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
  const coinType = 100
  console.log(`L2 Public Resolver deployed at  ${resolver.address}`);
  // await resolver["setAddr(bytes32,address)"](node, address2)
  // await resolver["setAddr(bytes32,address)"](node, address)
  // console.log(`setAddr(bytes32,address)`);
  // await resolver["setAddr(bytes32,uint256,bytes)"](node, coinType, address2)
  // console.log(`setAddr(bytes32,uint256,bytes)`);
  // await resolver["setText(bytes32,string,string)"](node, 'foo', 'bar');
  const name = encodeName("firstwrappedname.eth");
  console.log({name})
  await resolver["setAddrWithName(bytes,address)"](name, address);
  console.log(`setText(bytes32,string,string)`);
  console.log('***5')
  const result = await resolver["addr(bytes32)"](node)
  console.log('***6', result)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
