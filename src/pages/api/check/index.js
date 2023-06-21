import { ethers } from "ethers";
import abi from "../abi.json";

require("dotenv").config();
// import * as fs from 'fs';

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

function cleanEvents(events) {

    const removeDuplicates = events.filter((events, index, self) => index === self.findIndex((t) => (t.transactionHash === events.transactionHash)))
    
    //Sum up each entry
    const obj = {};
    for (const event of removeDuplicates) {
        const from = event.args[0];
        if(!(from in obj)) {
            obj[from] = 1
        } else {
            const count = obj[from] + 1;
            obj[from] = count;
        }
    }

    //sort the keys
    const sortedKeys = Object.keys(obj).sort((a, b) => obj[b] - obj[a]);
    //Sort the object
    const sortedObject = {};
    for (const key of sortedKeys) {
        sortedObject[key] = obj[key];
    }
    return sortedObject;

}

export async function getData(startBlock, endBlock) {
    // Perform asynchronous data retrieval or processing here using input1 and input2
    console.log('Fetching data with input1:', startBlock, 'and input2:', endBlock);

    const provider = new ethers.AlchemyProvider("mainnet", apiKey)

    const contract = new ethers.Contract(
        "0xbd3531da5cf5857e7cfaa92426877b022e612cf8",
        abi,
        provider
    );    

    const filter = contract.filters.Transfer(null, null);

    try {
        let events = await contract.queryFilter(filter, startBlock, endBlock);
        // console.log(events);
        const fromAddressCounts = cleanEvents(events);

        let obj = {
            "transfers" : fromAddressCounts,
            "startBlock" : startBlock,
            "endBlock" : endBlock,
            "success" : true
        };

        return obj;
    } catch (err) {
        return {
            "success" : false,
            "message": "Failed to retrieve data from blockchain"
            };
    }

    
}

export default async (req, res) => {
    const data = await getData(Number(req.query.startBlock), Number(req.query.endBlock))
    if(data.success) {
        res.status(200).json(data);
    } else {
        res.status(500).json(data);
    }
}
