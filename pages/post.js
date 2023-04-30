import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
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
      fetchData();
    }
  }, [id]);

  async function fetchData() {
    try {
      const res = await fetch(`${apiUrl}/post.php?id=${id}`);
      const json = await res.json();
      
      if(!localStorage.getItem("session", "jelli")){
        router.push('/login');
        return;
      }
      
      setData(json);

      setLoading(false);
    } catch (error) {
      console.log('Print the error:', error);
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="max-w-[700px] w-[95%] m-auto">Loading...</div>;
  }

  function handleClick() {
    router.push('/');
  }

  if (!data || data.length === 0) {
    return (
      <div className="max-w-[700px] w-[95%] m-auto">
        <p>Post no longer exists or perhaps it never did?</p>
        <p className="mt-2 text-md text-blue-500 cursor-pointer" onClick={handleClick}>Go back &larr;</p>
      </div>
    );
  }

  return (
    <>

{/* navigation */}
  <div className="z-10 relative mt-8 border-t-2 border-slate-900 max-w-[1473px] w-[95%] m-auto">
    <div className="flex gap-2 justify-between">
      
      <a className="block -mt-2 pt-1.5 rotate-0 bg-blue-300 px-2 sm:px-6 text-lg text-white ease ease-in-out duration-300 md:hover:pl-8 md:hover:pr-8" href="/">View all</a>
      
      <div className="flex gap-2">
        
        <a className="block" href="/search">
          <p className="border-slate-900 border-2 -mt-7 px-4 text-lg text-slate-900 hover:bg-slate-900 hover:text-white ease-in-out duration-300">Search</p>
        </a>  

        <a className="block" href="/form">
          <p className="mt-1 -rotate-1 bg-[#1A0123] px-6 sm:px-12 text-lg text-white md:hover:pl-10 md:hover:pr-10 ease-in-out duration-300">{`${process.env.NEXT_PUBLIC_BRAND}`}</p>
        </a>

      </div>
    </div>
  </div>



{/* content */}
    <div className="z-2 -mt-8 sm:-mt-4 bg-red-50 relative overflow-hidden px-6 py-12 lg:overflow-visible lg:px-0">

    
    {data.map(item => (

    <div key={item.id} className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
      
       
        <div className="bg-pink-400 lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">

      <div className="bg-yellow-100 lg:pr-4">
        
          <div className="lg:max-w-lg">
            <p className="pl-2 text-base font-semibold leading-7 text-red-300">29.04.23</p>
            <h1 className="pl-2 pr-2 mt-3 text-3xl font-bold text-right text-gray-900 sm:text-4xl">{DOMPurify.sanitize(item.title)}</h1>

            {item.linkTag && (
              <p className="bg-red-100 cursor-pointer mt-6 text-md leading-8 text-gray-700">
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



      <div className="bg-green-100 -ml-12 -mt-16 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
        
        { item.imgHref && (<ImageDynamic item={item} isLoggedIn={true}/> )}

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
    ))}
    </div>

    </>
  );
}

export default Post;
