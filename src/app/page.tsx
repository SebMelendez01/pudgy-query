'use client'
import { useState } from 'react';
import { getData } from '../modules/api';
import Image from 'next/image';
import PP_Logo from "../../public/images/pp-logo.svg";




interface TransferData {
  [key: string]: number;
}

export default function Home() {

  const [startBlock, setStartBlock] = useState('')
  const [endBlock, setEndBlock] = useState('')
  const [error, setError] = useState('')
  const [transfers, setTransfers] = useState<TransferData[]>([]);
  const [start, setStart] = useState(true);

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

  function closeBanner() {
    setStart(false);
  }

  return (
    <main className="flex flex-col items-center justify-between"  >
      {start && <div id="marketing-banner" tabIndex={-1} className="fixed z-50 flex flex-col xl:flex-row justify-between p-4 mx-10 bg-white border border-gray-100 rounded-lg shadow-sm lg:max-w-7xl top-6 dark:bg-[#ff8b8b] dark:border-gray-600">
          <div className="flex flex-col items-start mb-3 mr-4 xl:items-center xl:flex-row xl:mb-0">
              <a target="_blank" rel="noopener noreferrer" href="https://pudgypenguins.com/" className="flex items-center mb-2 border-gray-200 xl:pr-4 xl:mr-4 xl:border-r xl:mb-0 dark:border-gray-600">
                <Image
                priority
                src={PP_Logo}
                alt="Pudgy Logo"
                />
                <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">Pudgy Penguins</span>
              </a>
              <p className="flex items-center text-sm font-normal text-white dark:text-white">Input a blockrange to learn more about addresses transfering Pudgy Penguin NFTs. Example: 17503162, 17523162.</p>
          </div>
          <div className="flex items-center flex-shrink-0">
              <button data-dismiss-target="#marketing-banner" type="button" className="absolute top-2.5 right-2.5 md:relative md:top-auto md:right-auto flex-shrink-0 inline-flex justify-center items-center text-white hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-[fbf7eb] dark:hover:text-white">
                  <svg aria-hidden="true" onClick={closeBanner} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </button>
          </div>
      </div>}

      <div className='fixed z-0'>
        <img className=" w-screen h-screen" src="https://www.coindesk.com/resizer/BQ9LHb_3SB7I6mkXBxLvyOD-HH4=/1056x603/filters:quality(80):format(webp)/cloudfront-us-east-1.images.arcpublishing.com/coindesk/3PS6KYIK5NCMRHIMMLWPOG4J2U.png" />
      </div>
      <div className='absolute z-10 w-screen'>
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
            <div className='scale-75 md:scale-1'>
              <div className='overflow-auto max-h-60 relative shadow-md rounded-lg '>
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
