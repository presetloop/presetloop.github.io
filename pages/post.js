import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import getSessionData from '@/helpers/getSessionData';
import DOMPurify from 'dompurify';
import validUrl from 'valid-url';
import DeleteBtn from '../components/DeleteBtn';
import ImageDynamic from '../components/ImageDynamic';

function Post() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const { id } = router.query;
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
      const sessionData = getSessionData();
      if (!sessionData) {
        router.push('/login');
        return;
      }
    
      const res = await fetch(`${apiUrl}/post.php?id=${id}`);
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
        <p>Post no longer exists or perhaps it never did?</p>
        <p className="w-fit mt-2 border-slate-900 border-2 px-4 text-lg text-slate-900 hover:bg-slate-900 hover:text-white ease-in-out duration-300 cursor-pointer" onClick={handleClick}>Go back &larr;</p>
      </div>
    );
  }

  function generateRandomDate() {
  const a = (Math.floor(Math.random() * 28) + 1).toString().padStart(2, '0'); // Random number between 1-28
  const b = (Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0'); // Random number between 01-12
  const c = Math.floor(Math.random() * (2023 - 1996 + 1)) + 1996; // Random number between 1996-2023
  return `${a}:${b}:${c}`;
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

{/* navigation */}
  <div className="z-10 relative mt-8 border-t-2 border-slate-900 max-w-[1473px] w-[95%] m-auto">
    <div className="flex gap-2 justify-between">

      <a className={`${getRandomClass(random300)} block -mt-2 pt-2 sm:pt-1.5 rotate-0 px-2 sm:px-6 text-sm sm:text-lg text-white ease ease-in-out duration-300 sm:hover:pl-8 sm:hover:pr-8`} href="/">View all</a>
      
      <div className="flex gap-2">
        
        <a className="block" href="/search">
          <p className="border-slate-900 border-2 -mt-6 px-1 text-md sm:-mt-7 sm:px-4 sm:text-lg text-slate-900 hover:bg-slate-900 hover:text-white ease-in-out duration-300">Search</p>
        </a>  

        <a className="block" href="/form">
          <p className="mt-1 -rotate-1 bg-[#1A0123] px-2 sm:px-12 text-md sm:text-lg text-white sm:hover:pl-10 sm:hover:pr-10 ease-in-out duration-300">{`${process.env.NEXT_PUBLIC_BRAND}`}</p>
        </a>

      </div>
    </div>
  </div>



{/* MAIN CONTENT */}
  
    <div className={`main loadedAni`}>

  {data?.map(item => (
    <div key={item.id} className={`${getRandomClass(random50)} z-2 -mt-8 sm:-mt-4 relative overflow-hidden px-6 py-12 lg:overflow-visible lg:px-0`}>

    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
      
       
        <div className={`${getRandomClass(random400)} lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8`}>

      <div className={`${getRandomClass(random100)} lg:pr-4`}>
        
          <div className="lg:max-w-lg">
            <p className="pl-2 text-xs sm:text-base font-semibold leading-7 text-red-300">
            <time dateTime={null} className="bg-gray-100 text-gray-500">
              {generateRandomDate()}
            </time>
            </p>
            <h1 className="pl-2 pr-2 mt-3 text-2xl font-bold text-right text-gray-900 sm:text-3xl md:sm:text-4xl">{DOMPurify.sanitize(item.title)}</h1>

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
        </div>
      </div>



      <div className={`${getRandomClass(random100)} -ml-12 -mt-16 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden`}>
        
        { (<ImageDynamic item={item} isLoggedIn={true}/> )}

      </div>


        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="md:pr-8 max-w-xl text-base -mt-8 md:-mt-6 lg:-mt-2 xl:-mt-1 leading-7 text-gray-700 lg:max-w-lg">
              
              <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.content)}}></p>
              
            </div>

          <div className="-ml-2 flex justify-start mt-10">
            <DeleteBtn id={item.id} />
          </div>
          </div>
        </div>  
    </div>
  </div>
  
))}


      </div>
    

    </>
  );
}

export default Post;
