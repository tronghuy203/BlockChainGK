import Web3 from 'web3';

const getWeb3 = () => {
  return new Promise((resolve, reject) => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        window.ethereum.enable().then(() => {
          resolve(web3);
        });
      } catch (error) {
        reject(error);
      }
    }
    else {
      reject('Please install MetaMask extension to use Web3.');
    }
  });
};

export default getWeb3;
