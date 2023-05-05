import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { gsap, Sine } from 'gsap';
import getSessionData from '@/helpers/getSessionData';
import CountdownTimer from '@/components/CountdownTimer';
import LogoutBtn from '@/components/LogoutBtn';
import HomeListItem from '@/components/HomeListItem';
import Footer from '@/components/Footer';

export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadContent, setLoadContent] = useState(false);

  const element1Ref = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if(data && !loading){
      setLoadContent(true);
      setTimeout(() => {
        if (element1Ref.current) {
        gsap.fromTo(
          element1Ref.current,
          { opacity: 0, y: 100 },
          { 
            opacity: 1, y: 0, duration: .15, ease: Sine.easeIn,
            onComplete: () => setLoadContent(false)
          }
        );
      }
      }, 500);
    }
  }, [loading]);

  async function fetchData() {
  setLoading(true);

  try {
    const response = await axios.get(`${apiUrl}/index.php`);
    
    if (!response) {
      throw new Error('No data received from server');
    }
    
    const responseData = response.data;

    let loggedInSession = false;
    if (typeof window !== 'undefined') {
      const sessionInfo = getSessionData();
      if (sessionInfo) {
        const { sessionData } = sessionInfo;

        loggedInSession = responseData.logged_in && sessionData && Date.now() - sessionData.timestamp < 86400000; // 24 Hours / 60000 is 1 minute(for testing)

        if (!loggedInSession) {
          const sessionKeys = Object.keys(localStorage).filter(key => key.startsWith('myapp-session-'));
          if (sessionKeys.length > 0) {
            const latestSessionKey = sessionKeys.sort().reverse()[0];
            localStorage.removeItem(latestSessionKey); // Remove the session data using the key
          }
        }
      } 
      // else{
      //   console.log("No session data")
      // }
    }




    setLoggedIn(loggedInSession);
    setData(responseData.posts);

    setLoading(false);

  } catch (error) {
    console.log('Print the error:', error);
    setLoading(false);
  }
  }

  if (loggedIn === undefined) {
    return <p className='max-w-[1473px] w-[95%] m-auto'>Loading...</p>;
  }

  return (
    <>
    <div className="relative mt-8 border-t-2 border-slate-900 max-w-[1473px] w-[95%] m-auto">
      {loggedIn ? (
      <>
        <div className="absolute -top-7 left-0 bg-green-50">
          <CountdownTimer />
        </div>

        <div className="flex gap-2 justify-between">
          
            <a className="block" href="/form">
              <p className="mt-1 -rotate-1 bg-[#1A0123] px-2 sm:px-12 text-md sm:text-lg text-white sm:hover:pl-10 sm:hover:pr-10 ease-in-out duration-300">{`${process.env.NEXT_PUBLIC_BRAND}`}</p>
            </a>
            
          <div className="flex gap-2">
            <a className="block" href="/search">
              <p className="border-slate-900 border-2 -mt-6 px-1 text-md sm:-mt-7 sm:px-4 sm:text-lg text-slate-900 hover:bg-slate-900 hover:text-white ease-in-out duration-300">Search</p>
            </a>
            <LogoutBtn />
          </div>
        </div>
      </>
      ) : (
        <div className="flex gap-2 justify-between">
          <a className="block" href="/login">
            <p className="-mt-7 border-slate-900 border-2 px-4 text-lg text-slate-900 hover:bg-slate-900 hover:text-white ease-in-out duration-300">{`${process.env.NEXT_PUBLIC_BRAND}`}</p>
          </a>
          
            <div className="flex gap-2">
            <a className="block" href="/login">
              <p className="border-slate-900 border-2 -mt-7 px-4 text-lg text-slate-900 hover:bg-slate-900 hover:text-white ease-in-out duration-300">Login</p>
            </a>
            <a className="hidden sm:block" href="/register">
              <p className="border-slate-900 border-2 -mt-7 px-4 text-lg text-slate-900 hover:bg-slate-900 hover:text-white ease-in-out duration-300">Register</p>
            </a>
          </div>
        </div>
      )}

  {data.length > 0 && (
    // gsap animation compensation
    <div className={`${loadContent ? "hidden" : "block"}`}>
      
      {/* grid layout and spacing */}
        <div ref={element1Ref} 
          className="
            max-w-2xl 
            mx-auto 
            grid 
            pt-4 
            gap-x-6 
            gap-y-4 
            grid-cols-1 
            sm:gap-y-6 
            sm:pt-8 
            sm:grid-cols-2
            lg:mx-0 
            lg:max-w-none 
            lg:grid-cols-3">
          {data.map(({ id, title, linkTag, imgHref, content_excerpt }) => (
            <HomeListItem key={id} id={id} title={title} contentExcerpt={content_excerpt} linkTag={linkTag} imgHref={imgHref} loggedIn={loggedIn} />
          ))}
        </div>
      </div>
    )}
    

<div className={`${loadContent ? "hidden" : "block"}`}>
      <div className="flex justify-center text-xl my-16">
        <p className="cursor-pointer block my-0 bg-[#1A0123] px-8 text-lg text-white ease ease-in-out duration-300 hover:pl-12 hover:pr-12">
          Load more...
        </p>
      </div>
      
      </div>{/* \container */}

</div>

<div className={`${loadContent ? "hidden" : "block"}`}>
      {data && <Footer />}
</div>
    
    </>
  );
}
