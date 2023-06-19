require("dotenv").config();

export async function getData(startBlock: number, endBlock: number): Promise<any> {
    return fetch(`https://pudgy-pen-test.vercel.app/check?startBlock=${startBlock}&endBlock=${endBlock}`)
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