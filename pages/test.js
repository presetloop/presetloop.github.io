import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { sanitize } from 'dompurify';
import validUrl from 'valid-url';
import ImageDynamic from '../components/ImageDynamic';
import SamplePackSample from '@/components/SamplePackSample';
import getRandomColourClass from '@/helpers/GetRandomColourClass';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function Test() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState([]);


  useEffect(() => {    
    if (id) {
      setTimeout(() => {
        fetchData();
      }, 0);
    }
  }, [id]);


  async function fetchData() {
    try {
      const res = await fetch(`${apiUrl}/samplepack.php?id=${id}`);
      const json = await res.json();
      setData(json);

    } catch (error) {
      console.log('Print the error:', error);

    }
  }

  if (!data || data.length === 0) {
    return (
      <div></div>
    );
  }

 // const og = ["blue-300", "red-50", "pink-400", "yellow-100", "red-100", "green-100"];
const random50 = ["bg-blue-50", "bg-red-50", "bg-pink-50", "bg-yellow-50", "bg-green-50", "bg-purple-50", "bg-indigo-50", "bg-gray-50"];
  const random100 = ["bg-blue-100", "bg-red-100", "bg-pink-100", "bg-yellow-100", "bg-green-100", "bg-purple-100", "bg-indigo-100", "bg-gray-100"];
  const random300 = ["bg-blue-300", "bg-red-300", "bg-pink-300", "bg-yellow-300", "bg-green-300", "bg-purple-300", "bg-indigo-300", "bg-gray-300"];
  const random400 = ["bg-blue-400", "bg-red-400", "bg-pink-400", "bg-yellow-400", "bg-green-400", "bg-purple-400", "bg-indigo-400", "bg-gray-400"];  

// Count number of samples in pack to render UI list 
const sampleFileNames = Object.keys(data[0]).filter(key => key.startsWith('sampleFileName_') && data[0][key] !== null);

return (
<>

<div className="mt-1 sm:mt-8 flex flex-col h-screen">






{/* MAIN CONTENT */}

<div className={`${getRandomColourClass(random100)}`}>
<div className='w-[100%] m-auto flex-1'>

    <div className={`loadedAni`}>

  {data?.map(item => (
    <div key={item.id} className={`z-2 -mt-4 sm:-mt-4 lg:mt-0 relative overflow-hidden px-6 py-12 lg:overflow-visible lg:px-0`}>





    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-0">




    {/* left blank coloured tab -> decorative */}
    <div className={`${getRandomColourClass(random300)} lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8`}>




      {/* meta block */}
      <div className={`${getRandomColourClass(random400)} -mr-6 lg:mr-2 lg:pr-4`}>


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



      {/* lg:-mt-52 lg:row-start-2 */}
      <div className={`${getRandomColourClass(random400)} -ml-12 -mt-16 lg:-mt-52 lg:row-start-2 lg:col-start-2 lg:row-span-2 p-12 lg:sticky`}>
      {/* <div className={`${getRandomColourClass(random400)} -ml-12 -mt-16 lg:row-start-1 lg:col-start-2 lg:row-span-2 p-12 lg:sticky`}> */}




        {/* IMAGE */}
        <div className='loadAni -mt-2 ml-2 -mr-20 md:mr-0 sm:ml-16'>
          { (<ImageDynamic item={item} isLoggedIn={true} /> )}
        </div>

        
        {/* GROUPED META  */}
        <div className={`max-w-[750px] -mr-6 py-4 px-4 mt-8 ${getRandomColourClass(random50)}`}>
       
        {/* SUB_TITLE  */}
          <p dangerouslySetInnerHTML={{ __html: sanitize(item.sub_title)}} className={`rotate-1 text-center text-lg font-bold -mr-8 py-4 px-4 mt-0 ${getRandomColourClass(random300)}`}></p>

        {/* INFO  */}
          <p dangerouslySetInnerHTML={{ __html: sanitize(item.info)}} className={`-rotate-1 text-right -ml-8 py-4 px-4 mt-0 ${getRandomColourClass(random400)}`}></p>

        {/* PACK_DETAILS  */}
          <p dangerouslySetInnerHTML={{ __html: sanitize(item.pack_details)}} className={`rotate-0 text-left -mr-6 py-4 px-4 mt-0 ${getRandomColourClass(random100)}`}></p>
        </div>
      
      </div>




        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">



{/* lg:mt-4 */}
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
                <a className="sm:hover:text-black" href="https://open.spotify.com/artist/66OsKKYin7yLMQUsZxjE91" target="_blank">Play Artist on Spotify</a>
              )}
            </div>
            {/*  */}
            </div>


          </div>
        </div>  

        {/*  */}
    </div>
  </div>
  
))}

      </div>{/* \ LOAD ANI */}
    </div>{/* \CONTAINER */}
  </div>{/* ADD RANDOM COLOUR TO MAIN CONTENT */}






    {/* flex flex-col h-screen outer page wrapper */}
</div>
</>
  );
}

export default Test;
