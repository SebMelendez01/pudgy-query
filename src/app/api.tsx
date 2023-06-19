require("dotenv").config();

export async function getData(startBlock: number, endBlock: number): Promise<any> {
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;
    console.log(endpoint);
    return fetch(`${endpoint}/api/check?startBlock=${startBlock}&endBlock=${endBlock}`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("An error occurred while retrieving the data.");
            }
        })
        .catch((error) => {
            // Handle any errors that occurred during the fetch or JSON parsing
            console.error(error);
        });
}