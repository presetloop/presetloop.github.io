import { useState, useEffect } from 'react';
// import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
// import { gsap, Sine } from 'gsap';
import getSessionData from '@/helpers/getSessionData';
import Footer from '@/components/Footer';
import Home from '@/components/Home';
import HomeNav from '@/components/HomeNav';

export default function App() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [totalCount, setTotalCount] = useState(undefined);
  const [loggedIn, setLoggedIn] = useState(undefined);
    // ^^ props sent to Home.js ^^
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
    // ^^ first load state (page 1) ^^
  const [loading, setLoading] = useState(false);
  
  // const [loadContent, setLoadContent] = useState(false);
  // ^^ prop sent to Home.js ^^

  // const element1Ref = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 500);
  }, []);

  // useEffect(() => {
  //   if(data && !loading){
  //     // setLoadContent(false);
  //     setTimeout(() => {
  //       if (element1Ref.current) {
  //       gsap.fromTo(
  //         element1Ref.current,
  //         { opacity: 0, y: 100 },
  //         { 
  //           opacity: 1, y: 0, duration: .15, ease: Sine.easeIn,
  //           // onComplete: () => setLoadContent(false)
  //         }
  //       );
  //     }
  //     }, 100);
  //   }
  // }, [loading]);

  async function fetchData() {
  setLoading(true);

  try {
    // first load before hand off to Home.js / fetchNewData function
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
    setTotalCount(responseData.total_count);
    setLoading(false);

  } catch (error) {
    console.log('Print the error:', error);
    setLoading(false);
  }
  }

// const fadeIn = `${loading ? 'opacity-0' : 'opacity-100'}`;

if (loggedIn === undefined) {
  return <p className={`transition-all duration-5000 flex items-center justify-center h-screen -mt-[100px] text-[8vw]`}>Loading...</p>;
}

{/* <div className={`${fadeIn} transition-all duration-0`}></div> */}
return (
<div>
<div className="relative mt-8 border-t-2 border-slate-900 max-w-[1473px] w-[95%] m-auto">
    
    <HomeNav loggedIn={loggedIn} />

    {/* MAIN CONTENT */}
    {/* element1Ref={element1Ref} loadContent={loadContent} setLoadContent={setLoadContent} */}
    <Home loggedIn={loggedIn} totalCount={totalCount} />

</div>{/* \container */}

    {/* {data && <Footer />} */}
    <Footer />
  
</div>
);
}
