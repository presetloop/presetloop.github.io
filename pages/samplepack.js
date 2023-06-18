import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import IsGuestContext from '@/helpers/IsGuestContext';
import CountdownTimer from '@/components/CountdownTimer';
import {getAdminCookie} from '@/helpers/handleCookies';
import getSessionData from '@/helpers/getSessionData';
import { sanitize } from 'dompurify';
import validUrl from 'valid-url';
import DeleteBtn from '../components/DeleteBtn';
import EditBtn from '../components/EditBtn';
import ImageDynamic from '../components/ImageDynamic';
import Footer from '@/components/Footer';
import SamplePackSample from '@/components/SamplePackSample';
import getRandomColourClass, {random50, random100, random300, random400} from '@/helpers/GetRandomColourClass';
import generateRandomDate from '@/helpers/generateRandomDate';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function Samplepack() {
  const { isGuest } = useContext(IsGuestContext);
  const router = useRouter();
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
      // console.log(json);
      setLoading(false);
    } catch (error) {
      console.log('Print the error:', error);
      setLoading(false);
    }
  }


  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#101010]">
      <p className="text-white transition-all duration-5000 text-[20vw]">Loading</p>
    </div>
    )
  }

  function handleClick() {
    router.push('/');
  }

  if (!data || data.length === 0) {
    return (
      <div className="max-w-[700px] w-[95%] m-auto">
        <p>Samplepack no longer exists or perhaps it never did?</p>
        <p className="w-fit mt-2 border-slate-900 border-2 px-4 text-lg text-slate-900 sm:hover:bg-slate-900 sm:hover:text-white ease-in-out duration-300 cursor-pointer" onClick={handleClick}>Home &larr;</p>
      </div>
    );
  }


// Count number of samples in pack to render UI list 
const sampleFileNames = Object.keys(data[0]).filter(key => key.startsWith('sampleFileName_') && data[0][key] !== null);

return (
<>
<div className="mt-1 sm:mt-8 flex flex-col min-h-screen">












{/*  */}
{/*  */}
<div className='max-w-[1600px] w-[99%] m-auto flex-1'>





{/* navigation */}
  <div className="z-10 relative mt-8 sm:mt-2 border-t-2 border-white">
    <div className="flex gap-2 justify-between">

      { isGuest && <div className="z-100 absolute -top-7 left-0 bg-green-50">
        <CountdownTimer /></div>
      }

      <a className={`${getRandomColourClass(random300)} sm:rotate-2 block mt-0 h-fit sm:mt-1 sm:mb-1 pb-1 pt-1 sm:pb-1 sm:pt-1 lg:-mb-2 px-2 sm:px-6 text-sm sm:text-lg text-white ease ease-in-out duration-300 sm:hover:text-black leading-0 cursor-pointer`} href="/">Index</a>
      
      <div className="flex gap-2 w-full justify-between">
        
        {isGuest ? (
      <>
      <div className="flex gap-2 justify-between">

      <div className={`flex text-white sm:hover:text-black ${isGuest ? "ml-12 sm:ml-80" : ""}`}>
          
      <a href={"/"}>
          
        <img className="invert -mt-4 h-auto w-16 transition-all ease-in-out duration-1000 cursor-pointer" src="/pl-logo-trans.png" alt="Preset Loop" />

      </a>

      </div>

        </div>
      </>
        ) : (
          <div className="flex text-white sm:hover:text-black">
            <a href="/">
              
              <img className="invert -mt-4 h-auto w-16 transition-all ease-in-out duration-1000 cursor-pointer" src="/pl-logo-trans.png" alt="Preset Loop" />
              
            </a>
        </div>
        )}



  { data?.map(item => (
    <div className={`${isGuest ? "sm:-ml-80" : ""} lg:-ml-16 w-fit h-fit -rotate-[3deg] text-black`} key={item.id}>
      {item.isNew ? (
        <p className={`${getRandomColourClass(random100)} z-100 font-bold tracking-widest leading-4 text-sm -mt-2 px-2 py-4 uppercase`}>
        <span className='inline-block border-b-4 border-red-600'>
          {sanitize(item.isNew)}
        </span></p>
      ) : (
        // add ${getRandomColourClass(random100)} for empty block
        <p className={`-rotate-90 tracking-widest text-sm mt-0 px-2 py-4 uppercase`}>&nbsp;&nbsp;</p>
      )}
    </div>
    ))}
        


        <div>
        <a className="block" href="/search">
          <p className={`${getRandomColourClass(random100)} w-fit border-white border-0 mr-2 lg:ml-16 -mt-4 sm:-mt-6 lg:-mt-5 px-1 text-md sm:px-4 py-1 text-sm sm:text-lg text-black sm:hover:text-white ease-in-out duration-300 cursor-pointer`}>Search</p>
        </a>  

        <a className="block" href={admin ? "/form" : "/"}>
          <p className={`hidden lg:inline-block mt-1 -rotate-3 ${getRandomColourClass(random300)} px-2 sm:px-6 text-md sm:text-lg text-white sm:hover:text-black ease-in-out duration-300 cursor-pointer`}>{`${process.env.NEXT_PUBLIC_BRAND}`}</p>
        </a>
        </div>

      </div>
      {/*  */}
    </div>
  </div>{/* \navigation */}

</div>{/* \CONTAINER */}
{/*  */}
{/*  */}













{/* MAIN CONTENT */}

<div className={`-mt-2 lg:-mt-4 ${getRandomColourClass(random100)}`}>
<div className='w-[100%] m-auto flex-1 min-h-screen'>

    <div className={`loadedAni`}>

  {data?.map(item => (
    <div key={item.id} className={`z-2 -mt-4 sm:-mt-4 lg:mt-12 relative overflow-hidden px-6 py-12 lg:overflow-visible lg:px-0`}>





    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-0 lg:-mt-8">




    {/* left blank coloured tab -> decorative */}
    <div className={`${getRandomColourClass(random300)} lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8`}>




      {/* meta block */}
      <div className={`${getRandomColourClass(random400)} -mr-6 lg:mr-2 lg:pr-4 lg:-mt-4`}>


        <div className="lg:max-w-lg">

        {/* GENRE */}
        <div className='flex justify-between'>
          {item.genre ? (
            <p className={`${getRandomColourClass(random300)} -rotate-1 -mt-2 -ml-4 px-2 text-xs sm:text-base text-white font-semibold leading-7 w-fit`}>
          {sanitize(item.genre)}
          </p>
          ) : (
            <p className={`${getRandomColourClass(random300)} -rotate-1 -mt-2 -ml-4 px-2 text-xs sm:text-base text-white font-semibold leading-7 w-fit`}>
            Space Jazz
          </p>
          )}
          
          {/* DATE */}
          <p className={`-mt-4 rotate-1 mr-4 px-2 text-xs sm:text-base text-white font-semibold leading-7 w-fit`}>
            <span className={`p-1 ${getRandomColourClass(random300)}`}>
              {item.date ? sanitize(item.date) : (
              <time dateTime={null}>
                {generateRandomDate()}
              </time> 
              )}
            </span>
          </p>
        </div>

          {/* TITLE */}
            <h1 className="pl-2 pr-8 sm:pr-2 mt-3 pb-2 text-2xl font-bold text-right text-white sm:text-3xl md:sm:text-4xl">{sanitize(item.title)}</h1>

            {/* PRODUCER */}
            {item.producer ? (
              <p className={`${getRandomColourClass(random100)} w-fit -ml-1 rotate-3 -mb-2 mt-0 px-2 text-md leading-8 text-gray-700`}>
                Producer: {sanitize(item.producer)}
              </p>
            ) : (
                <p className={`${getRandomColourClass(random100)} w-fit -ml-1 rotate-1 -mb-2 mt-0 px-2 text-md leading-8 text-gray-700`}>
                Producer: MVM
              </p>
              )}
            </div>
            {/*  */}
        </div>
      </div>



      <div className={`${getRandomColourClass(random400)} -ml-12 -mt-16 lg:-mt-52 lg:row-start-2 lg:col-start-2 lg:row-span-2 p-12 lg:sticky`}>
      {/* <div className={`${getRandomColourClass(random400)} -ml-12 -mt-16 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 h-fit`}> */}






        {/* IMAGE */}
        <div className='loadAni -mt-3 lg:mt-4 ml-2 -mr-20 md:mr-0 sm:ml-16'>
          { (<ImageDynamic item={item} packPreviewUrl={item.packPreviewUrl} isLoggedIn={true} /> )}
        </div>










        {/* GROUPED META  */}
        <div className={`max-w-[750px] -mr-6 py-4 px-4 mt-8 ${getRandomColourClass(random50)}`}>
       
        {/* SUB_TITLE  */}
          <p className={`rotate-1 text-center text-lg font-bold -mr-8 py-4 px-4 mt-0 ${getRandomColourClass(random300)}`}>{sanitize(item.sub_title)}</p>

        {/* INFO  */}
          <p className={`-rotate-1 text-right -ml-8 py-4 px-4 mt-0 ${getRandomColourClass(random400)}`}>{sanitize(item.info)}</p>

        {/* PACK_DETAILS */}
          <p className={`rotate-0 text-left -mr-6 py-4 px-4 mt-0 ${getRandomColourClass(random100)}`}><span>{sampleFileNames.length}</span> Samples. Royalty Free. .WAV Files.</p>
        </div>
      
      </div>




        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">



          <div className={`lg:mt-4 lg:pr-4 sm:ml-8 ${getRandomColourClass(random100)}`}>        
          {/* <div className={`lg:pr-4 sm:ml-8 ${getRandomColourClass(random100)}`}> */}
            
            <div className="-mr-3 md:pr-8 max-w-xl text-base -mt-8 lg:mt-8 leading-7 text-gray-700 lg:max-w-lg">
                
                {/* SAMPLES */}
                {
                  Array.from({ length: sampleFileNames.length }, (_, index) => (
                    <SamplePackSample
                      key={index + 1}
                      isLoggedIn={true}
                      sampleFileName={item[`sampleFileName_${index + 1}`]}
                      sampleFileUrl={item[`sampleFileUrl_${index + 1}`]}
                      getRandomColourClass={getRandomColourClass(random400)}
                    />
                  ))
                }

            <div className={`w-fit ml-4 mt-4 -rotate-2 text-white ${getRandomColourClass(random400)}`}>
              {item.linkTag ? (
                <a className="sm:hover:text-black" href={sanitize(validUrl.isWebUri(item.linkTag))} target="_blank">Play Artist on Spotify</a>
              ) : (
                <a className="sm:hover:text-black cursor-pointer" href="https://open.spotify.com/artist/66OsKKYin7yLMQUsZxjE91" target="_blank">Play Artist on Spotify</a>
              )}
            </div>
            {/*  */}
            </div>



          {/* ADMIN BUTTONS */}
          { admin && (
            <div className="-ml-2 flex justify-start mt-10">
              <DeleteBtn id={item.id} />
              <EditBtn id={item.id} />
            </div>
          )}
          {/*  */}

          </div>
        </div>  

        {/*  */}
    </div>
  </div>
  
))}

      </div>{/* \ LOAD ANI */}
    </div>{/* \CONTAINER */}
  </div>{/* ADD RANDOM COLOUR TO MAIN CONTENT */}





    <div className='mt-auto'>
      <Footer />
    </div>



    {/* flex flex-col h-screen outer page wrapper */}
  </div>
</>
  );
}

export default Samplepack;
