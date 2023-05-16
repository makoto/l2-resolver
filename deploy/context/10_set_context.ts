import { ethers } from 'hardhat'
import { DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // const { getNamedAccounts, network } = hre
  // const { owner } = await getNamedAccounts()

  // const resolver = await ethers.getContract('ContextResolver')
  // const registry = await ethers.getContract('ENSRegistry')
}

func.tags = ['SetContextResolver']
func.dependencies = ['ContextResolver']

export default func
