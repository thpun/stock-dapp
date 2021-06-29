import Web3 from "web3";

import {abi} from './inventory';

// console.log(process.env);
export const web3 = new Web3(process.env.REACT_APP_WEB3_URL || "ws://localhost:8546");

export const InventoryInstance = new web3.eth.Contract(abi, process.env.REACT_APP_INVENTORY_CONTRACT);
