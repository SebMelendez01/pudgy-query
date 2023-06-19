'use client'
import { useState } from 'react';
import { getData } from './api';



interface TransferData {
  [key: string]: number;
}

export default function Home() {

  const [startBlock, setStartBlock] = useState('')
  const [endBlock, setEndBlock] = useState('')
  const [error, setError] = useState('')
  const [transfers, setTransfers] = useState<TransferData[]>([]);

  function sortTransferData(transferData: TransferData[]): TransferData[] {
    return transferData.sort((a, b) => b["number"] - a["number"]);
  }

  const handleInputChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartBlock(e.target.value);
  };

  const handleInputChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndBlock(e.target.value);
  };

  const handleButtonClick = async () => {
    const numberRegex = /^\d+$/;

    if (startBlock == '' || endBlock == '') {
      setError('Please provide input values for both.');
      setTransfers([]);
    } else if (numberRegex.test(startBlock) && numberRegex.test(endBlock)) {
        const start = parseInt(startBlock)
        const end = parseInt(endBlock)
        
      if (start < end) {
        try{
          const ret = await getData(start, end);
          if(!ret.success) {
            throw new Error(ret.error)
          }
          //get the key values
          const keyValueArray = Object.entries(ret.transfers).map(([key, value]) => ({ [key]: value } as TransferData));
          setTransfers(keyValueArray);
          setError('');
        } catch (err: any) {
          setTransfers([]);
          setError(err.message);
        }
      } else {
        setError('Input 1 should be less than Input 2.');
        setTransfers([]);
      }
    } else {
      setError('Input values should only contain numbers.');
      setTransfers([]);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between"  >
      <div className=' w-full h-screen relative z-0"'>
        <img className="object-cover w-full h-full" src="https://www.coindesk.com/resizer/BQ9LHb_3SB7I6mkXBxLvyOD-HH4=/1056x603/filters:quality(80):format(webp)/cloudfront-us-east-1.images.arcpublishing.com/coindesk/3PS6KYIK5NCMRHIMMLWPOG4J2U.png" />
      </div>
      <div className='absolute z-10'>
        <div className=' flex flex-col items-center justify-between py-20'>
          <div className='pb-8'>
            <img src="https://d12b90t6rq6rcc.cloudfront.net/56a63cd1af5e/assets/orig/logo-2.4c4b3ce7.png" alt="Be A Killer" width="300" height="auto"/>
          </div>
          <input className="bg-[#00142d] border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 " type="text" value={startBlock} onChange={handleInputChange1} style={{ color: 'white' }} placeholder="Start Block" required/>
          <br />
          <input className="bg-[#00142d] border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 " type="text" value={endBlock} onChange={handleInputChange2} style={{ color: 'white' }} placeholder="End Block" required/>
          <br />
          <button className='py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-[#00142d] hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-[#00142d] dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-[#00142f]' onClick={handleButtonClick}>Submit</button>
        </div>
        {error &&
        <div className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">ERROR!</span> {error}
          </div>
        </div>
        }
          {transfers.length > 0 && (
            <div>
              <div className='overflow-auto lg:max-h-60 relative shadow-md rounded-lg'>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                      <th className="sticky z-10 top-0 text-sm leading-6 font-semibold text-slate-700 bg-white p-0 dark:bg-slate-900 dark:text-slate-300">
                        <div className='px-6 py-3 border-b border-slate-200 dark:border-slate-400/20'>Address</div>
                      </th>
                      <th className="sticky z-10 top-0 text-sm leading-6 font-semibold text-slate-700 bg-white p-0 dark:bg-slate-900 dark:text-slate-300">
                        <div className="px-6 py-3 border-b border-slate-200 dark:border-slate-400/20">Value</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="align-baseline">
                    {transfers.map((transfer, index) => {
                      const address = Object.keys(transfer)[0];
                      const value = transfer[address];
                      return (
                          <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' key={index}>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"><a target="_blank" rel="noopener noreferrer" href={`https://etherscan.io/address/${address}`}>{address}</a></td>
                            <td scope="row" className="px-6 py-4">{value}</td>
                          </tr>
                      );
                      })}                    
                  </tbody>
                </table>
              </div>
            </div>
          )}

      </div>
    </main>
  )
}
