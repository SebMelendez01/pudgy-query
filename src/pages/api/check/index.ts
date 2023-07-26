import { ethers } from "ethers";
import abi from "../abi.json";

require("dotenv").config();

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

function cleanEvents(events: any) {

    //remove duplicates
    const removeDuplicates = events.filter((event:any, index:number, arr:any) => 
        index === arr.findIndex((t:any) => 
            (t.transactionHash === event.transactionHash)))
    
    //reduce to an obj and combine
    const obj = removeDuplicates.reduce((o:any, cur:any) => ({ 
        ...o, [cur.args[0]]: o[cur.args[0]] = o[cur.args[0]] ? o[cur.args[0]] + 1 : 1
    }), {})

    //Sort the object
    const sortedObject = Object.fromEntries(
        Object.entries(obj).sort(([ , a], [ , b]) =>{ 
            const aNum = a as number;
            const bNum = b as number;
            
            return bNum - aNum; 
        })
    );

    return sortedObject;
}

export async function getData(startBlock: number, endBlock: number) {
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

export default async (req: any, res: any) => {
    const data = await getData(Number(req.query.startBlock), Number(req.query.endBlock))
    if(data.success) {
        res.status(200).json(data);
    } else {
        res.status(500).json(data);
    }
}
