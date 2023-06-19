require("dotenv").config();

export async function getData(startBlock: number, endBlock: number): Promise<any> {
    return fetch(`http://localhost:3000/check?startBlock=${startBlock}&endBlock=${endBlock}`)//https://pudgy-pen-test.vercel.app/
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        })
        .catch((error) => {
            return {'error' : error.message, "success" : false}
        });
}