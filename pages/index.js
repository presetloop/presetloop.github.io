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
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadContent, setLoadContent] = useState(false);

  const element1Ref = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 1);
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
      }, 100);
    }
  }, [loading]);

  async function fetchData() {
  setLoading(true);

  try {
    // const response = await axios.get(`${apiUrl}/index.php`);

    const response = await axios.get(`${apiUrl}/index.php?page=${page}`);

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

function handleFetchArticles(event) {
  event.preventDefault();
  const nextPage = page + 1;
  axios
    .get(`${apiUrl}/index.php?page=${nextPage}`)
    .then((response) => {
      const responseData = response.data;
      if (responseData.posts.length === 0) {
        setLastPage(true);
      } else {
        const newPosts = responseData.posts.slice(0, 2); // fetch 2 new articles
        setData((prevPage) => [...prevPage, ...newPosts]);
        setPage(nextPage);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}


const fadeIn = `${loading ? 'bg-opacity-0' : 'bg-opacity-100'}`;

if (loggedIn === undefined) {
  return <p className={`transition-all duration-5000 flex items-center justify-center h-screen -mt-[100px] text-[8vw]`}>Loading...</p>;
}


return (
  <div className={`${fadeIn} transition-all duration-1000`}>
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

{/* MAIN CONTENT */}
  {data.length > 0 && (
    // for gsap
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
            sm:pt-6 
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
    
  {/* for gsap */}
      <div className={`${loadContent ? "hidden" : "block"}`}>
          <div className="flex justify-center text-xl my-16">
              
              <div onClick={handleFetchArticles} className={!lastPage ? 'relative cursor-pointer my-0 bg-[#1A0123] px-8 text-lg text-white ease duration-300 hover:bg-[#1a1] hover:scale-105 hover:pl-12 hover:pr-12' : 'hover:bg-[#1A0123] hover:scale-100 hover:pl-8 hover:pr-8'}>
                <p className={lastPage ? `load-more-btn select-none` : "select-none"}>
                  {!lastPage ? "Load more..." : "You have reached the end :)"}
                </p>
              </div>

          </div>    
      </div>


  </div>{/* \container */}

  {/* for gsap + push footer to bottom on screens above 640px to fill gap */}
  <div className={window.innerHeight > 1150 ? `${page === 1 ? "sm:absolute sm:bottom-0 sm:left-0 sm:right-0 sm:p-[2rem]" : "block"} ${loadContent ? "hidden" : "block"}` : ""}>
        {data && <Footer />}
  </div>
    
</div>
);
}
