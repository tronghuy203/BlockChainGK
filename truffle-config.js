const path = require('path')
module.exports = {
  contracts_build_directory: "./client/src/contracts",
  networks: {
    develop: {     // Localhost (default: none)
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",            // Standard Ethereum port (default: none)   // Any network (default: none)
    },
    geth: {    
      host: "127.0.0.1",
      port: 8511,
      network_id: "1209",           
    },
   
  },

  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.18",      // Fetch exact version from solc-bin (default: truffle's version)
   
    }
  },

  
};
