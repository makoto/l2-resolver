import { DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { ethers } from 'hardhat'


const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { getNamedAccounts, deployments } = hre
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  if(!(process.env.GRAPHQL_URL && process.env.CONTEXT) ){
    throw("Set GRAPHQL_URL and CONTEXT")
  }
  const tx = await deploy('ContextResolver', {
    from: deployer,
    args: [
      process.env.GRAPHQL_URL || 'http://localhost:8000/subgraphs/name/makoto/ens-l2-subgraph/graphql',
      ethers.utils.toUtf8Bytes(process.env.CONTEXT)
    ],
    log: true,
  })
  console.log(`Deployed OffchainDNSResolver to ${tx.address}`)
}

func.tags = ['ContextResolver']

export default func
