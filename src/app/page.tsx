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
    console.log("I")
    setStart(false);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between"  >
      {start && <div id="marketing-banner" tabIndex={-1} className="fixed z-50 flex flex-col md:flex-row justify-between w-[calc(100%-2rem)] p-4 -translate-x-1/2 bg-white border border-gray-100 rounded-lg shadow-sm lg:max-w-7xl left-1/2 top-6 dark:bg-[#ff8b8b] dark:border-gray-600">
          <div className="flex flex-col items-start mb-3 mr-4 md:items-center md:flex-row md:mb-0">
              <a href="https://pudgypenguins.com/" className="flex items-center mb-2 border-gray-200 md:pr-4 md:mr-4 md:border-r md:mb-0 dark:border-gray-600">
                  <svg width="57" height="39" viewBox="0 0 107 89" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_425_1537)">
                      <path d="M106.573 52.3936C106.367 50.6603 105 44.3941 99.2825 39.7346C97.051 37.8942 94.136 36.2485 90.3469 35.1092C89.1228 28.5654 86.3003 22.4232 82.1291 17.226C73.9748 6.97705 60.9669 0.258049 46.2793 0.0243442L46.2452 0V0.0243442C45.7227 0.0243442 45.2002 0.0243442 44.6778 0.0243442V0L44.6533 0.0243442C32.1582 0.243442 20.2148 5.22914 11.7626 13.7788C4.02816 21.6031 -0.146663 31.7108 -0.000178336 42.2469C0.102361 48.8199 0.224432 50.8356 1.03498 64.0107C1.20588 66.7713 1.40608 70.0188 1.64045 73.9042C1.6704 74.5271 1.85135 75.1336 2.1678 75.6715C7.28013 84.0216 34.2724 85.0684 47.461 85.0684C51.5357 85.0684 54.4385 84.9808 54.9342 84.9564C56.0621 85.4311 64.2823 88.8515 68.1178 88.9976C68.6744 89.0168 69.2303 88.9444 69.7633 88.7833L77.4196 86.4609C77.6975 86.3764 77.9389 86.2015 78.1053 85.964C78.2717 85.7266 78.3535 85.4404 78.3376 85.1512L78.069 79.8149C78.0557 79.5162 78.1559 79.2234 78.3496 78.995C78.5433 78.7667 78.8163 78.6196 79.1139 78.5831C89.0505 77.3902 95.281 80.1801 97.5418 81.0954C97.7088 81.1623 97.8879 81.1937 98.0678 81.1879C98.2477 81.182 98.4244 81.1389 98.5867 81.0614L105.862 77.5899C106.073 77.4882 106.252 77.332 106.38 77.1375C106.509 76.943 106.583 76.7175 106.595 76.4846C106.787 72.9109 107.422 59.0639 106.573 52.3936ZM94.9197 55.2614C93.0154 54.7404 89.5144 54.0442 84.3508 53.9882C85.7331 53.019 87.3201 52.3794 88.9895 52.1185C90.9426 51.9189 92.4856 52.4301 93.7356 53.6717C94.2046 54.1485 94.61 54.6836 94.9417 55.2638L94.9197 55.2614ZM93.7795 39.0603L91.0452 50.5751C90.2976 50.4548 89.5372 50.4352 88.7844 50.5167H88.7405C87.5784 50.7043 86.4469 51.0465 85.3762 51.5343L81.299 42.6024C83.3019 41.0686 85.581 39.9315 88.0129 39.2526C89.8916 38.7292 91.8683 38.6591 93.7795 39.0481V39.0603ZM24.6142 51.5002C17.7782 50.7942 12.1239 49.8886 8.03697 49.1242C7.97349 46.9527 7.8856 39.9464 9.13072 34.0989C13.037 34.7952 18.5058 35.6375 25.0634 36.3143C24.497 43.6346 24.5556 49.2776 24.6142 51.488V51.5002ZM16.5819 33.4514C17.412 26.1968 19.9999 22.6133 20.8593 21.5958C24.2626 22.1605 28.2959 22.7058 32.8515 23.0807C31.5918 26.9563 31.3427 32.7357 31.2988 35.0581C25.7372 34.6175 20.7519 34.0332 16.5819 33.4392V33.4514ZM27.0996 20.6585C27.6269 18.9836 29.2138 14.7039 32.8222 10.0249C36.8055 10.5901 40.8208 10.9007 44.8438 10.9549V21.7832C38.912 21.757 32.9869 21.3814 27.0996 20.6585V20.6585ZM33.1543 35.1823C33.2031 32.9182 33.457 26.803 34.7656 23.2146C38.1055 23.4581 41.6992 23.5895 45.5078 23.5895C49.4629 23.5895 53.6426 23.4386 58.0128 23.0783C59.6095 26.803 59.419 33.1714 59.297 35.377C50.5872 35.8568 41.8559 35.7918 33.1543 35.1823V35.1823ZM59.8878 9.98113C62.3605 13.1269 64.2836 16.6658 65.5763 20.4491C59.3182 21.2879 53.0134 21.7335 46.6993 21.7832V10.9549C51.1127 10.9352 55.5195 10.6098 59.8878 9.98113V9.98113ZM59.9415 22.9128C64.2189 22.5087 68.672 21.9001 73.2472 21.0431C75.4073 24.8732 76.9962 28.9966 77.964 33.2834C72.4012 34.2297 66.7932 34.8895 61.1622 35.2602C61.294 32.8647 61.421 26.9344 59.9415 22.9079V22.9128ZM47.0704 37.5193H48.0176C54.8519 37.5291 61.6817 37.1683 68.4767 36.4384C68.1056 36.6478 67.7443 36.862 67.3829 37.0908C62.3048 40.353 58.5304 45.5626 56.1817 52.4423C53.0714 52.5835 50.0245 52.6517 47.0704 52.6565V37.5193ZM67.2755 39.1163L78.8332 42.6024C74.4386 46.5559 71.338 52.0966 69.4826 57.5643L57.1973 54.6089C58.9698 48.5424 62.0558 42.8653 67.2755 39.1017V39.1163ZM79.9855 43.6881L83.9357 52.3206C81.1672 54.0685 79.3605 56.7902 78.1935 59.7358L71.0646 58.0512C72.7834 52.9389 75.6496 47.5102 79.9855 43.6735V43.6881ZM91.4797 37.2028C90.1604 37.1902 88.8457 37.3606 87.5735 37.7092C84.9405 38.4475 82.4775 39.6912 80.3225 41.3706L69.0431 37.9624C72.5929 35.9028 76.7677 34.9486 81.1672 35.1969C85.2688 35.4257 88.6623 36.1512 91.4797 37.1882V37.2028ZM88.3791 34.5688C87.0648 34.2618 85.7347 34.0262 84.3947 33.8628C85.6154 33.5999 86.8215 33.3272 88.0276 33.0302C88.1692 33.5512 88.2815 34.0624 88.3791 34.5688ZM87.5442 31.2823C84.9611 31.9153 82.3749 32.4687 79.7853 32.9426C78.8358 28.6545 77.2823 24.5221 75.1711 20.6682C77.2267 20.2593 79.3215 19.787 81.4162 19.2709C84.1444 22.8935 86.2211 26.961 87.5539 31.292L87.5442 31.2823ZM80.176 17.6982C75.8254 18.7499 71.5675 19.5581 67.4367 20.1667C66.9142 18.4626 65.4152 14.3241 61.9581 9.63544C64.2368 9.2508 66.5724 8.76392 68.965 8.17479C73.2291 10.6827 77.0255 13.9081 80.1857 17.708L80.176 17.6982ZM44.9756 2.57562C45.1259 2.4957 45.2936 2.4539 45.4639 2.4539C45.6342 2.4539 45.8019 2.4957 45.9522 2.57562C50.1124 4.82502 52.5245 7.05982 53.9014 8.83695C48.3119 9.30049 42.6919 9.26138 37.1094 8.7201C38.5107 6.95758 40.9033 4.77147 44.9756 2.57562ZM41.9336 1.96701C41.9565 1.96565 41.9793 1.97201 41.9981 1.98507C42.017 1.99812 42.0309 2.01712 42.0377 2.03901C42.0444 2.0609 42.0436 2.08442 42.0354 2.1058C42.0271 2.12717 42.0119 2.14517 41.9922 2.1569C38.8818 4.08496 36.5283 6.20777 34.9805 8.48639C31.5518 8.08407 28.1527 7.46118 24.8046 6.62163C30.1618 3.98845 35.9773 2.40816 41.9336 1.96701V1.96701ZM13.0565 15.0496C15.8506 12.2331 19.02 9.81333 22.4755 7.85831C25.1881 8.64608 27.9474 9.26401 30.7373 9.70847C27.1386 14.6114 25.6689 18.9057 25.2294 20.4199C20.3518 19.7803 15.5195 18.8338 10.7616 17.5863C11.4891 16.7147 12.246 15.8676 13.0565 15.0496ZM1.826 42.2177C1.78242 39.0614 2.14841 35.9128 2.91487 32.8501C3.57406 33.001 5.08285 33.337 7.30943 33.7508C6.08872 39.5155 6.11313 46.1469 6.17661 48.7566C4.29183 48.3768 2.87093 48.0603 1.96272 47.8461C1.88948 46.0885 1.8553 44.4087 1.82112 42.2177H1.826ZM2.04085 49.818C3.9305 50.2513 7.32407 50.9719 11.9139 51.7217V65.1549C6.92368 63.9522 3.88168 62.7837 2.75374 62.3212C2.37776 56.1718 2.16292 52.6614 2.03596 49.818H2.04085ZM22.7782 69.0743V81.8404C18.0419 81.2123 13.6034 80.3067 10.1317 79.0262L9.87291 66.5668L10.5614 66.7421L11.0033 66.8516C11.1986 66.9003 11.3939 66.949 11.5966 66.9953C11.7992 67.0415 11.9994 67.0926 12.2069 67.1389L12.9393 67.3044L13.4935 67.4262L14.4506 67.6307C14.807 67.7061 15.183 67.7792 15.5419 67.8522C16.4599 68.0356 17.4234 68.2133 18.4325 68.3853C19.2463 68.5233 20.0927 68.6588 20.9716 68.7919C21.6137 68.8868 22.2729 68.9818 22.9491 69.0718L22.7782 69.0743ZM17.9589 66.4207L17.3998 66.3185L16.8456 66.2163L16.306 66.1116L15.7787 66.0069L15.2587 65.9022L14.2821 65.6977L13.7572 65.5833V52.0138C18.4545 52.7442 24.2114 53.455 30.7641 53.9419V68.0421C28.1372 67.8376 25.7446 67.5795 23.5961 67.2971C21.5746 67.0318 19.6899 66.7348 17.954 66.4207H17.9589ZM44.8487 83.2183C39.1309 83.155 31.665 82.8872 24.6337 82.0643V69.2836C31.1918 70.0577 37.7908 70.4349 44.3946 70.4132H44.8487V83.2183ZM46.7041 83.2183V70.3889C48.8477 70.3645 51.0792 70.3012 53.3985 70.199C53.3273 74.5258 53.5836 78.8519 54.1651 83.1403C53.1397 83.189 50.4102 83.2572 46.6993 83.2377L46.7041 83.2183ZM53.628 65.3983C53.5499 66.3915 53.4913 67.375 53.4522 68.3391C46.5142 68.6705 39.563 68.6104 32.6318 68.1589V54.0734C37.0703 54.3606 41.8457 54.531 46.875 54.531C49.6973 54.531 52.6075 54.4726 55.5762 54.346C54.5571 57.9625 53.9028 61.6715 53.6231 65.4178L53.628 65.3983ZM67.3829 68.7237C67.3683 69.605 67.3536 70.8319 67.3488 72.2439L55.0684 68.9428C55.1892 64.6364 55.762 60.3544 56.7774 56.167L68.9845 59.1029C68.0247 62.2247 67.4861 65.4601 67.3829 68.7237V68.7237ZM69.3361 87.2253C69.3361 85.0538 68.9406 78.8022 68.9552 73.9382L76.1476 73.5195C76.1672 73.7873 76.1916 74.688 76.1916 74.7026L76.7189 84.9954L69.3361 87.2253ZM76.1183 71.9518L68.9699 72.3851C68.9699 70.7832 68.9943 69.7072 69.0089 68.7334C69.0529 66.4159 69.5412 63.1343 70.591 59.58L77.6369 61.2695C76.554 64.7284 76.0363 68.3386 76.1037 71.9615L76.1183 71.9518ZM84.634 76.6502C84.3068 76.6502 83.9699 76.6502 83.633 76.6502C81.7273 76.6489 79.8248 76.8036 77.9445 77.1127L77.8176 74.5858C77.8176 74.5736 77.8176 74.5006 77.8029 74.3764C77.8016 74.3545 77.8016 74.3326 77.8029 74.3107C77.8029 74.2864 77.8029 74.262 77.8029 74.2352C77.8041 74.2255 77.8041 74.2157 77.8029 74.206C77.8029 74.1841 77.8029 74.1598 77.8029 74.133C77.8029 74.0332 77.7883 73.9188 77.7834 73.7897C77.7785 73.6607 77.7834 73.5463 77.7687 73.4173C77.7687 73.3588 77.7687 73.2956 77.7687 73.2298C77.7687 72.872 77.7516 72.4484 77.7541 71.9761C77.7541 71.8495 77.7541 71.718 77.7541 71.5842C77.7541 71.4989 77.7541 71.4113 77.7541 71.3237C77.7541 71.0973 77.7541 70.8611 77.7736 70.6177C77.7736 70.496 77.7785 70.3718 77.7883 70.2452C77.7883 70.1186 77.7883 70.0018 77.8078 69.863C77.8273 69.7243 77.82 69.6025 77.8298 69.4686C77.8395 69.3347 77.8469 69.2009 77.8566 69.0645C77.8664 68.9282 77.8762 68.7919 77.8884 68.6531L77.9103 68.4097C77.9103 68.2928 77.9323 68.1662 77.9445 68.0542C77.9445 67.9715 77.9616 67.8863 77.9689 67.8108C77.9836 67.6672 78.0007 67.5235 78.0178 67.3799L78.0544 67.0805C78.0666 66.9782 78.0788 66.876 78.0934 66.7737C78.1081 66.6715 78.1203 66.5839 78.1349 66.4889C78.1545 66.3404 78.1764 66.1895 78.2033 66.0361C78.2302 65.8827 78.257 65.6904 78.2888 65.5176C78.3107 65.3813 78.3351 65.2449 78.3596 65.1086C80.4595 65.0713 82.5598 65.1624 84.6486 65.3813L84.634 76.6502ZM97.1585 68.3099C97.1218 69.3494 97.0608 70.0407 97.0486 70.1795C97.0478 70.1843 97.0478 70.1893 97.0486 70.1941V70.1941L96.6043 78.9093C93.2708 77.7093 89.7876 76.9721 86.2527 76.7184V65.5638C92.8445 66.4597 97.0974 68.2953 97.156 68.3245V68.3099H97.1585ZM78.694 63.4702C79.3874 60.6171 80.569 57.7542 82.5368 55.5827C90.5496 55.4318 94.988 56.9022 95.8572 57.2235C96.1304 57.9936 96.3522 58.7808 96.5213 59.58C96.9768 61.8905 97.1936 64.2415 97.1682 66.596C95.1077 65.7927 88.1008 63.3826 78.6794 63.48L78.694 63.4702ZM105.015 76.2022L98.1936 79.4595L98.6575 70.3158C98.6721 70.199 98.7405 69.4394 98.7844 68.2904L105.376 65.15C105.284 70.1113 105.074 74.7513 105 76.212L105.015 76.2022ZM105.386 63.3534L98.8089 66.4938C98.8089 63.7283 98.5305 59.9452 97.388 56.7561L104.492 50.3925C104.708 51.1168 104.871 51.8555 104.981 52.603C105.323 55.1689 105.406 59.2635 105.371 63.3631L105.386 63.3534Z" fill="#00142D"></path>
                      <path d="M88.3789 34.5688C87.0646 34.2619 85.7345 34.0262 84.3945 33.8628C85.6152 33.5999 86.8213 33.3273 88.0274 33.0303C88.169 33.5512 88.2813 34.0625 88.3789 34.5688Z" fill="#F5FDFF"></path>
                      <path d="M105.357 65.1597C105.284 70.121 105.074 74.7513 105.001 76.2119L98.1797 79.4692L98.6436 70.3255C98.6582 70.2087 98.7266 69.4491 98.7705 68.3001L105.357 65.1597Z" fill="#F5FDFF"></path>
                      <path d="M105.373 63.3632L98.7959 66.5036C98.7959 63.7381 98.5176 59.955 97.375 56.7659L104.494 50.3926C104.709 51.1169 104.873 51.8556 104.982 52.603C105.324 55.1689 105.407 59.2636 105.373 63.3632Z" fill="#F5FDFF"></path>
                      <path d="M94.9258 55.2615C93.0215 54.7405 89.5157 54.0443 84.3398 53.9858C85.7221 53.0167 87.3091 52.3771 88.9785 52.1162C90.9317 51.9166 92.4747 52.4278 93.7247 53.6694C94.1919 54.1464 94.5957 54.6816 94.9258 55.2615V55.2615Z" fill="#F5FDFF"></path>
                      <path d="M97.1671 66.596C95.1065 65.7926 88.0997 63.3825 78.6758 63.4799C79.3691 60.6268 80.5508 57.7639 82.5186 55.5924C90.5313 55.4414 94.9698 56.9118 95.839 57.2332C96.923 60.2275 97.1671 63.9181 97.1671 66.596Z" fill="#F5FDFF"></path>
                      <path d="M84.6209 65.3692V76.66C84.2938 76.66 83.9569 76.66 83.6199 76.66C81.7143 76.6587 79.8117 76.8134 77.9314 77.1226L77.8045 74.5859C77.5941 71.4164 77.7712 68.2331 78.3318 65.1063C80.4316 65.0658 82.5319 65.1536 84.6209 65.3692V65.3692Z" fill="#F5FDFF"></path>
                      <path d="M97.1426 68.3095C97.1035 69.4439 97.0352 70.1645 97.0303 70.2035L96.586 78.9285C93.2525 77.7285 89.7693 76.9912 86.2344 76.7375V65.5635C92.8262 66.4593 97.0791 68.2949 97.1377 68.3241L97.1426 68.3095Z" fill="#F5FDFF"></path>
                      <path d="M76.7201 84.9857L69.3227 87.2351C69.3227 85.0636 68.9272 78.812 68.9418 73.948L76.1488 73.5195C76.1684 73.7873 76.1928 74.6881 76.1928 74.7027L76.7201 84.9857Z" fill="#F5FDFF"></path>
                      <path d="M76.1055 71.9616L68.957 72.3949C68.957 70.7931 68.9814 69.717 68.9961 68.7433C69.04 66.4257 69.5283 63.1441 70.5781 59.5898L77.6387 61.2696C76.5559 64.7285 76.0382 68.3387 76.1055 71.9616V71.9616Z" fill="#F5FDFF"></path>
                      <path d="M83.9375 52.3063C81.169 54.0542 79.3623 56.7759 78.1953 59.7215L71.0664 58.0369C72.7754 52.9392 75.6514 47.5105 79.9873 43.6738L83.9375 52.3063Z" fill="#F5FDFF"></path>
                      <path d="M93.7813 39.0485L91.0469 50.5633C90.2994 50.443 89.539 50.4233 88.7862 50.5048H88.7422C87.5802 50.6924 86.4487 51.0347 85.378 51.5224L81.3008 42.6027C83.3037 41.0689 85.5827 39.9318 88.0147 39.2529C89.8934 38.7295 91.8701 38.6594 93.7813 39.0485Z" fill="#F5FDFF"></path>
                      <path d="M91.4796 37.1881C90.1603 37.1755 88.8456 37.3459 87.5733 37.6945C84.9393 38.4372 82.4761 39.6859 80.3223 41.3705L69.043 37.9623C72.5928 35.9027 76.7676 34.9485 81.167 35.1968C85.2686 35.4256 88.6622 36.1511 91.4796 37.1881Z" fill="#F5FDFF"></path>
                      <path d="M78.8351 42.6023C74.4405 46.5558 71.3399 52.0965 69.4844 57.5642L57.1992 54.6088C58.9717 48.5423 62.0576 42.8652 67.2774 39.1016L78.8351 42.6023Z" fill="#F5FDFF"></path>
                      <path d="M68.9913 59.1029C68.0298 62.2245 67.4896 65.4599 67.3848 68.7237C67.3702 69.605 67.3555 70.832 67.3507 72.2439L55.0703 68.9428C55.1911 64.6364 55.7638 60.3544 56.7793 56.167L68.9913 59.1029Z" fill="#F5FDFF"></path>
                      <path d="M54.1602 83.1596C53.1397 83.1888 50.4102 83.257 46.6992 83.2375V70.4081C48.8428 70.3838 51.0742 70.3205 53.3936 70.2183C53.3224 74.5451 53.5787 78.8712 54.1602 83.1596V83.1596Z" fill="#F5FDFF"></path>
                      <path d="M22.9337 69.0743H22.7725V81.8405C18.0362 81.2124 13.5977 80.3068 10.126 79.0263L9.86719 66.5669C14.1682 67.6635 18.5316 68.5009 22.9337 69.0743V69.0743Z" fill="#F5FDFF"></path>
                      <path d="M44.8437 70.4182V83.2281C39.1259 83.1648 31.6601 82.897 24.6288 82.0742V69.2935C31.1868 70.0675 37.7858 70.4447 44.3896 70.423L44.8437 70.4182Z" fill="#F5FDFF"></path>
                      <path d="M55.5743 54.3556C54.5558 57.969 53.9015 61.6747 53.6212 65.4176C53.5431 66.4109 53.4845 67.3944 53.4454 68.3584C46.5074 68.6898 39.5562 68.6297 32.625 68.1783V54.0732C37.0684 54.3605 41.8438 54.5309 46.8731 54.5309C49.6954 54.5309 52.6056 54.4822 55.5743 54.3556Z" fill="#F5FDFF"></path>
                      <path d="M30.7608 53.9417V68.0419C28.1339 67.8374 25.7413 67.5794 23.5928 67.297C19.8037 66.8101 16.5274 66.1966 13.7539 65.5929V52.0137C18.461 52.7391 24.2178 53.4548 30.7608 53.9417Z" fill="#F5FDFF"></path>
                      <path d="M11.9082 51.7216V65.1548C6.92287 63.9521 3.88087 62.7836 2.75293 62.3211C2.37695 56.1766 2.16211 52.6662 2.03516 49.8228C3.92481 50.2512 7.32327 50.9718 11.9082 51.7216Z" fill="#F5FDFF"></path>
                      <path d="M6.16561 48.7566C4.28083 48.3768 2.85993 48.0603 1.95172 47.8461C1.88825 46.0885 1.85407 44.4087 1.81989 42.2177C1.7763 39.0614 2.14229 35.9128 2.90876 32.8501C3.56794 33.001 5.07674 33.337 7.30331 33.7508C6.0826 39.5155 6.10213 46.1469 6.16561 48.7566Z" fill="#F5FDFF"></path>
                      <path d="M24.6123 51.4882C17.7763 50.7822 12.122 49.8766 8.03509 49.1122C7.97161 46.9407 7.88372 39.9344 9.12884 34.0869C13.0351 34.7832 18.5039 35.6255 25.0615 36.3022C24.4951 43.6347 24.5537 49.2777 24.6123 51.4882Z" fill="#F5FDFF"></path>
                      <path d="M68.4767 36.4238C68.1056 36.6332 67.7442 36.8474 67.3829 37.0763C62.3048 40.3384 58.5303 45.548 56.1817 52.4277C53.0713 52.5689 50.0244 52.6371 47.0703 52.6419V37.5047H48.0176C54.8519 37.5145 61.6817 37.1537 68.4767 36.4238V36.4238Z" fill="#F5FDFF"></path>
                      <path d="M87.5547 31.2922C84.9717 31.9251 82.3854 32.4785 79.7959 32.9524C78.8442 28.6605 77.2874 24.5247 75.1719 20.6684C77.2275 20.2594 79.3223 19.7871 81.417 19.271C84.1452 22.8937 86.2219 26.9611 87.5547 31.2922Z" fill="#F5FDFF"></path>
                      <path d="M80.1866 17.708C75.836 18.7597 71.5782 19.5679 67.4473 20.1765C66.9248 18.4724 65.4258 14.3339 61.9688 9.64522C64.2474 9.26058 66.583 8.7737 68.9756 8.18457C73.2355 10.6905 77.0285 13.9125 80.1866 17.708V17.708Z" fill="#F5FDFF"></path>
                      <path d="M41.9921 2.15686C38.8818 4.08492 36.5283 6.20774 34.9804 8.48636C31.5517 8.08403 28.1527 7.46115 24.8046 6.62159C30.1618 3.98841 35.9772 2.40812 41.9335 1.96698C41.9565 1.96562 41.9792 1.97198 41.9981 1.98503C42.0169 1.99809 42.0309 2.01708 42.0376 2.03897C42.0444 2.06086 42.0436 2.08438 42.0353 2.10576C42.0271 2.12714 42.0119 2.14513 41.9921 2.15686V2.15686Z" fill="#F5FDFF"></path>
                      <path d="M53.9014 8.83715C48.3119 9.3007 42.6919 9.26159 37.1094 8.7203C38.5059 6.95778 40.8985 4.77167 44.9707 2.57582C45.121 2.49591 45.2887 2.4541 45.459 2.4541C45.6293 2.4541 45.797 2.49591 45.9473 2.57582C50.1124 4.82523 52.5245 7.06003 53.9014 8.83715Z" fill="#F5FDFF"></path>
                      <path d="M44.8419 10.9549V21.7832C38.9101 21.757 32.985 21.3814 27.0977 20.6585C27.625 18.9836 29.2119 14.7039 32.8203 10.0249C36.8036 10.59 40.8189 10.9006 44.8419 10.9549V10.9549Z" fill="#F5FDFF"></path>
                      <path d="M30.7374 9.70856C27.1387 14.6115 25.669 18.9058 25.2296 20.42C20.3519 19.7803 15.5196 18.8339 10.7617 17.5863C11.4941 16.7148 12.2461 15.8676 13.0567 15.0497C15.8507 12.2332 19.0201 9.81342 22.4756 7.8584C25.1882 8.64617 27.9475 9.2641 30.7374 9.70856V9.70856Z" fill="#F5FDFF"></path>
                      <path d="M32.8516 23.0685C31.5919 26.9441 31.3428 32.7234 31.2989 35.0458C25.7373 34.6174 20.7617 34.0331 16.582 33.4391C17.4121 26.1846 20 22.6011 20.8594 21.5835C24.2627 22.1532 28.296 22.6936 32.8516 23.0685Z" fill="#F5FDFF"></path>
                      <path d="M59.295 35.3768C50.5853 35.8566 41.8539 35.7916 33.1523 35.1821C33.2012 32.918 33.4551 26.8028 34.7637 23.2145C38.1035 23.4579 41.6973 23.5894 45.5059 23.5894C49.461 23.5894 53.6407 23.4384 58.0109 23.0781C59.6075 26.8028 59.4171 33.1712 59.295 35.3768Z" fill="#F5FDFF"></path>
                      <path d="M61.1622 35.2551C61.2941 32.8548 61.421 26.9343 59.9415 22.9077C64.2189 22.5036 68.672 21.895 73.2473 21.0381C75.4073 24.8681 76.9963 28.9915 77.9641 33.2784C72.4013 34.2247 66.7932 34.8845 61.1622 35.2551V35.2551Z" fill="#F5FDFF"></path>
                      <path d="M65.5763 20.4489C59.3182 21.2877 53.0134 21.7333 46.6992 21.783V10.9547C51.1114 10.9299 55.5166 10.5996 59.8829 9.96631C62.3588 13.1161 64.2836 16.6601 65.5763 20.4489V20.4489Z" fill="#F5FDFF"></path>
                      <path d="M66.5997 6.79439C63.1105 7.58754 59.5773 8.17445 56.0186 8.55204C54.4121 6.11762 51.9072 3.87795 48.543 1.84277C54.8395 2.23666 60.9867 3.92237 66.5997 6.79439V6.79439Z" fill="#80ABFF"></path>
                      <path d="M18.7652 21.1356C17.4835 22.9297 15.462 26.6836 14.7173 33.0837C8.6846 32.1732 4.63428 31.3042 3.36719 31.0193C4.68951 26.6925 6.77271 22.6344 9.51956 19.0347C10.8843 19.429 14.0948 20.2811 18.7652 21.1356Z" fill="#80ABFF"></path>
                      <path d="M45.1871 37.4V52.5469C38.3706 52.4958 32.0571 52.116 26.4565 51.5853C26.3403 46.5192 26.487 41.4504 26.896 36.3994C32.3818 36.9204 38.5733 37.3099 45.1871 37.4Z" fill="#80ABFF"></path>
                      <path d="M8.23049 78.1667C6.13576 77.193 4.55128 76.0293 3.70411 74.6441C3.54174 74.3591 3.45047 74.0393 3.43799 73.7117C3.21582 70.0382 3.02295 66.9392 2.85938 64.2856C3.94092 64.7019 5.64015 65.3032 7.97414 65.9703L8.23049 78.1667Z" fill="#80ABFF"></path>
                      <path d="M67.3141 87.2231C63.7741 86.7362 57.4899 84.1898 55.8395 83.5057C55.2214 79.2041 54.9438 74.8607 55.0094 70.5156L67.319 73.8216C67.2946 78.7367 67.3092 84.9469 67.3141 87.2231Z" fill="#80ABFF"></path>
                      <path d="M103.885 48.64L96.6782 55.0815C96.2147 54.1045 95.5927 53.2104 94.8374 52.4352C94.1958 51.7911 93.4335 51.2791 92.5938 50.9283L95.3281 39.3965C96.2849 39.727 97.1936 40.1821 98.0308 40.75C100.635 42.8294 102.653 45.5484 103.885 48.64V48.64Z" fill="#80ABFF"></path>
                      <path d="M2.85938 64.2856C3.01074 66.9635 3.23535 70.0552 3.44287 73.7385C3.45702 74.0682 3.55263 74.3893 3.72119 74.6733C4.05165 75.1947 4.4544 75.6667 4.91749 76.0756C5.90851 76.9369 7.02575 77.6421 8.23049 78.1667L7.97414 65.9727C5.63527 65.2911 3.94336 64.7117 2.85938 64.2856Z" fill="#6691E5"></path>
                      <path d="M13.7637 65.5837V62.7646C15.0626 63.9648 16.4615 65.199 17.9532 66.4162C16.4493 66.1509 15.0504 65.8685 13.7637 65.5837ZM54.1594 83.1602C51.6435 82.844 49.1512 82.3634 46.6985 81.7214V83.2381C50.4094 83.2575 53.1389 83.1894 54.1594 83.1602V83.1602ZM10.126 79.0217C13.5977 80.3022 18.0362 81.2126 22.7726 81.8358V70.136C22.1524 69.693 21.5519 69.2426 20.9537 68.7922C17.2216 68.2454 13.5209 67.5027 9.86722 66.5672L10.126 79.0217ZM44.843 83.2235V81.2005C37.2404 78.9681 30.4386 75.3871 24.628 71.4287V82.0695C31.6593 82.8972 39.1252 83.165 44.843 83.2283V83.2235ZM11.9082 65.1552V61.0167C5.56056 54.8479 2.03516 49.8184 2.03516 49.8184C2.16211 52.6618 2.37695 56.1722 2.75293 62.3167C3.88087 62.7841 6.92287 63.9526 11.9082 65.1552Z" fill="#DBE3E5"></path>
                      <path d="M95.8414 57.2429C96.9254 60.2348 97.1695 63.9278 97.1695 66.6057C95.109 65.8023 88.1021 63.3922 78.6782 63.4896C79.3716 60.6365 80.5532 57.7736 82.521 55.6021C90.5338 55.4511 94.9723 56.9191 95.8414 57.2429V57.2429ZM93.7223 53.6692C92.4722 52.4276 90.9195 51.9139 88.9761 52.116C87.3072 52.3771 85.7204 53.0158 84.3374 53.9832C89.5132 54.0392 93.0191 54.7403 94.9234 55.2613C94.5932 54.6813 94.1895 54.1462 93.7223 53.6692V53.6692ZM86.2369 65.5735V76.7523C87.4405 76.8375 88.5782 76.9763 89.6378 77.1467C91.8799 77.5059 94.0858 78.0624 96.2296 78.8094L96.5836 78.936L97.0279 70.2135C97.0279 70.1721 97.1012 69.4539 97.1402 68.3195V68.3317C97.0816 68.3049 92.8189 66.4596 86.2369 65.5735V65.5735ZM78.3315 65.1061C78.1152 66.279 77.958 67.462 77.8604 68.6506C77.814 69.2056 77.7798 69.7412 77.7578 70.2427C77.7578 70.3693 77.7529 70.4934 77.7432 70.6152C77.7261 71.102 77.7188 71.5597 77.7188 71.9736C77.7188 72.7039 77.7334 73.3101 77.7529 73.7531C77.7529 73.943 77.77 74.1037 77.7773 74.24C77.792 74.4518 77.8018 74.5735 77.8042 74.5906L77.9312 77.1272C79.8114 76.8181 81.714 76.6634 83.6197 76.6647C83.9566 76.6647 84.2935 76.6647 84.6206 76.6647V65.3787C82.532 65.1574 80.4316 65.0663 78.3315 65.1061V65.1061Z" fill="#DBE3E5"></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_425_1537">
                        <rect width="107" height="89" fill="white"></rect>
                      </clipPath>
                    </defs>
                  </svg>
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
