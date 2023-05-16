import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'hardhat-deploy'
import { resolve } from 'path'

const ensContractsPath = './node_modules/@ensdomains/ens-contracts'

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    hardhat: {
      chainId: 1337
    },
    localhost: {
      url: 'http://localhost:8545',
      chainId: 1337
    },
  },
  external: {
    contracts: [
      {
        artifacts: [
          resolve(ensContractsPath, 'artifacts'),
          resolve(ensContractsPath, './deployments/archive'),
        ],
        deploy: resolve(ensContractsPath, './build/deploy'),
      },
    ],
  },
};

export default config;
