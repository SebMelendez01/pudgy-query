import { ethers } from "ethers";
import abi from "../../../assets/abi.json";
// require("dotenv").config();
// import * as fs from 'fs';

const apiKey = ""; //process.env.API_KEY;

function cleanEvents(events) {
    const seenTransactionHashes = new Set();
    const tempEvents = [];



    //Clean event Data such that there are no duplicate transactions
    for (const event of events) {
        const transactionHash = event.transactionHash;

        if (!seenTransactionHashes.has(transactionHash)) {
            seenTransactionHashes.add(transactionHash);
            tempEvents.push(event);
        }
    }

 
    const cleanedMap = new Map();
    for (const event of tempEvents) {
        const from = event.args[0];
        if(!cleanedMap.has(from)) {
            cleanedMap.set(from, 1); 
        } else {
            const count = Number(cleanedMap.get(from));
            cleanedMap.set(from, count + 1);
        }
    }

    // Convert Map to plain JavaScript object
    const obj = {};
        cleanedMap.forEach((value, key) => {
        obj[key] = value;
    });

    const sortedKeys = Object.keys(obj).sort((a, b) => obj[b] - obj[a]);

    const sortedObject = {};
    for (const key of sortedKeys) {
        sortedObject[key] = obj[key];
    }

    return sortedObject;

}

export async function getData(startBlock, endBlock) {//
    // Perform asynchronous data retrieval or processing here using input1 and input2
    console.log('Fetching data with input1:', startBlock, 'and input2:', endBlock);

    const provider = new ethers.AlchemyProvider("mainnet", apiKey)

    const contract = new ethers.Contract(
        "0xbd3531da5cf5857e7cfaa92426877b022e612cf8",
        abi,
        provider
    );    
    const filter = contract.filters.Transfer(null, null);
    let events = await contract.queryFilter(filter, startBlock, endBlock);
    const fromAddressCounts = cleanEvents(events);
    
    let obj = {
        "transfers" : fromAddressCounts,
        "startBlock" : startBlock,
        "endBlock" : endBlock,
        "success" : true
    };

    return obj;
}

export default async (req, res) => {
    const data = await getData(Number(req.query.startBlock), Number(req.query.endBlock))
    if(data.success) {
        res.status(200).json(data);
    } else {
        res.status(500);
    }
}
