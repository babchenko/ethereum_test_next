// @ts-nocheck
import web3 from './web3';
import abi from './abi.json';

const contractInstance = new web3.eth.Contract(
    abi,
    process.env.NEXT_PUBLIC_CONTRACT_ID
);

export default contractInstance;