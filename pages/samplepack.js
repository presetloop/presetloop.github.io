import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import IsGuestContext from '@/helpers/IsGuestContext';
import CountdownTimer from '@/components/CountdownTimer';
import {getAdminCookie} from '@/helpers/handleCookies';
import getSessionData from '@/helpers/getSessionData';
import DOMPurify from 'dompurify';
import validUrl from 'valid-url';
import DeleteBtn from '../components/DeleteBtn';
import EditBtn from '../components/EditBtn';
import ImageDynamic from '../components/ImageDynamic';
import Footer from '@/components/Footer';
import SamplePackSample from '@/components/SamplePackSample';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function Samplepack() {
  const router = useRouter();
  const { isGuest } = useContext(IsGuestContext);
  const { id } = router.query;
  const [admin, setAdmin] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {    
    if (id) {
      setTimeout(() => {
        fetchData();
      }, 0);
    }
  }, [id]);


  async function fetchData() {
    try {
      // If not logged in, redirect.
      const getCookie = getAdminCookie();
      const sessionData = getSessionData();
      if ((!sessionData === true) && !getCookie) {
        router.push('/login');
        return;
      }
      if(getCookie){
        setAdmin(true)
      }
      const res = await fetch(`${apiUrl}/samplepack.php?id=${id}`);
      const json = await res.json();
      setData(json);
      setLoading(false);
    } catch (error) {
      console.log('Print the error:', error);
      setLoading(false);
    }
  }


  if (loading) {
    return <p className={`text-slate-200 transition-all duration-5000 flex items-center justify-center h-screen -mt-[100px] text-[8vw]`}>Loading...</p>;
  }

  function handleClick() {
    router.push('/');
  }

  if (!data || data.length === 0) {
    return (
      <div className="max-w-[700px] w-[95%] m-auto">
        <p>Samplepack no longer exists or perhaps it never did?</p>
        <p className="w-fit mt-2 border-slate-900 border-2 px-4 text-lg text-slate-900 hover:bg-slate-900 hover:text-white ease-in-out duration-300 cursor-pointer" onClick={handleClick}>Go back &larr;</p>
      </div>
    );
  }

  // const og = ["blue-300", "red-50", "pink-400", "yellow-100", "red-100", "green-100"];
  const random50 = ["bg-blue-50", "bg-red-50", "bg-pink-50", "bg-yellow-50", "bg-green-50", "bg-purple-50", "bg-indigo-50", "bg-gray-50"];
  const random100 = ["bg-blue-100", "bg-red-100", "bg-pink-100", "bg-yellow-100", "bg-green-100", "bg-purple-100", "bg-indigo-100", "bg-gray-100"];
  const random300 = ["bg-blue-300", "bg-red-300", "bg-pink-300", "bg-yellow-300", "bg-green-300", "bg-purple-300", "bg-indigo-300", "bg-gray-300"];
  const random400 = ["bg-blue-400", "bg-red-400", "bg-pink-400", "bg-yellow-400", "bg-green-400", "bg-purple-400", "bg-indigo-400", "bg-gray-400"];

  function getRandomClass(classesArray) {
    const randomIndex = Math.floor(Math.random() * classesArray.length);
    return classesArray[randomIndex];
  }

return (
<>
<div className="mt-1 sm:mt-8 flex flex-col h-screen">

<div className='max-w-[1200px] w-[95%] m-auto flex-1'>

{/* navigation */}
  <div className="z-10 relative mt-8 sm:mt-2 border-t-2 border-white">
    <div className="flex gap-2 justify-between">

      { isGuest && <div className="z-100 absolute -top-7 left-0 bg-green-50">
        <CountdownTimer /></div>
      }

      <a className={`${getRandomClass(random300)} sm:-rotate-1 block mt-2 sm:mt-1 sm:mb-1 pb-1 pt-1 sm:pb-1 sm:pt-1 lg:mt-2 lg:-mb-2 px-2 sm:px-6 text-sm sm:text-lg text-white ease ease-in-out duration-300 sm:hover:pl-8 sm:hover:pr-8 leading-0`} href="/">Back</a>
      
      <div className="flex gap-2">
        
        <div className="flex text-[#101010] sm:hover:text-white">
            <a href="/login">

              <h1 className='-mt-[24px] [word-spacing:-0px]'>pre</h1>
              <p className="-mt-[21px] ml-2 mr-6 px-2 bg-transparent ease-in-out duration-300">
                <img className="ml-4 invert h-10 w-10 transition-all ease-in-out duration-1000" src="/loop.svg" alt="Preset Loop" />
              </p>

              <h1 className='-mt-[43px] ml-[74px] [word-spacing:-0px]'>set</h1>
            </a>
          </div>

        <a className="block" href="/search">
          <p className="border-white border-2 -mt-5 px-1 text-md sm:-mt-7 sm:px-4 text-sm sm:text-lg text-white hover:bg-slate-900 hover:text-white ease-in-out duration-300">Search</p>
        </a>  

        <a className="block" href={admin ? "/form" : "/"}>
          <p className={`hidden sm:inline-block mt-1 -rotate-1 ${getRandomClass(random300)} px-2 sm:px-12 text-md sm:text-lg text-white sm:hover:pl-10 sm:hover:pr-10 ease-in-out duration-300`}>{`${process.env.NEXT_PUBLIC_BRAND}`}</p>
        </a>

      </div>
    </div>
  </div>



{/* MAIN CONTENT */}
  
    <div className={`loadedAni`}>

  {data?.map(item => (
    <div key={item.id} className={`${getRandomClass(random100)} z-2 -mt-0 sm:-mt-4 lg:mt-0 relative overflow-hidden px-6 py-12 lg:overflow-visible lg:px-0`}>

    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-0">
      
       
        <div className={`${getRandomClass(random300)} lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8`}>

      <div className={`${getRandomClass(random400)} -mr-6 lg:mr-2 lg:pr-4`}>
        
          <div className="lg:max-w-lg">
            <p className={`${getRandomClass(random300)} -mt-2 -ml-4 px-2 text-xs sm:text-base text-white font-semibold leading-7 w-fit`}>
            {item.genre}
            {/* <time dateTime={null} className="bg-gray-100 text-gray-500">
              {generateRandomDate()}
            </time> */}
            </p>
            <h1 className="pl-2 pr-2 mt-3 pb-2 text-2xl font-bold text-right text-gray-900 sm:text-3xl md:sm:text-4xl">{DOMPurify.sanitize(item.title)}</h1>

            {item.linkTag && (
              <p className={`${getRandomClass(random100)} cursor-pointer mt-6 text-md leading-8 text-gray-700`}>
                <span className="text-pink-400">&rarr;</span>
                <a className="pl-2 md:hover:text-indigo-400" href={
                  item.linkTag &&
                  validUrl.isWebUri(item.linkTag) &&
                  DOMPurify.sanitize(item.linkTag).replace(/^https?:\/\//i, 'https://')} target="_blank" rel="noopener">
                  {window.innerWidth < 480 ? (item.linkTag && item.linkTag.replace(/^https?:\/\//i, '')).slice(0, 20) : (item.linkTag && item.linkTag.replace(/^https?:\/\//i, ''))}
                </a>
              </p>
            )}
            </div>
            {/*  */}
        </div>
      </div>



      <div className={`${getRandomClass(random400)} -ml-12 -mt-16 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden`}>
        
        <div className='-mt-4'>
          { (<ImageDynamic item={item} isLoggedIn={true}/> )}
        </div>
        
        <div className={`mt-8 ${getRandomClass(random300)}`}>
          <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.info)}}></p>
        </div>
      </div>


        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          
          <div className="lg:pr-4">
            
            <div className="md:pr-8 max-w-xl text-base -mt-8 lg:mt-8 xl:mt-8 leading-7 text-gray-700 lg:max-w-lg">
              
              
              <SamplePackSample getRandomClass={getRandomClass(random400)} />
              <SamplePackSample getRandomClass={getRandomClass(random300)} />
              <SamplePackSample getRandomClass={getRandomClass(random400)} />
              <SamplePackSample getRandomClass={getRandomClass(random300)} />
              <SamplePackSample getRandomClass={getRandomClass(random400)} />
              <SamplePackSample getRandomClass={getRandomClass(random300)} />
              <SamplePackSample getRandomClass={getRandomClass(random400)} />
              <SamplePackSample getRandomClass={getRandomClass(random300)} />
              <SamplePackSample getRandomClass={getRandomClass(random400)} />
              <SamplePackSample getRandomClass={getRandomClass(random300)} />


            {/*  */}
            </div>







          {/* ADMIN BUTTONS */}
          { admin && (
            <div className="-ml-2 flex justify-start mt-10">
              <DeleteBtn id={item.id} />
              <EditBtn id={item.id} />
          </div>
          )}
          </div>
        </div>  
    </div>
  </div>
  
))}

      </div>{/* \ MAIN CONTENT */}
    </div>{/* \CONTAINER */}
  
    <div className='mt-auto'>
      <Footer />
    </div>
  </div>
</>
  );
}

export default Samplepack;
