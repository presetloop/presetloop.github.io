import { useState, useEffect, useContext } from 'react';
import IsGuestContext from '@/helpers/IsGuestContext';
import axios from 'axios';
import {getAdminCookie} from '@/helpers/handleCookies';
import getSessionData from '@/helpers/getSessionData';
import CountdownTimer from '@/components/CountdownTimer';
import HomeNav from '@/components/HomeNav';
import Home from '@/components/Home';
import Footer from '@/components/Footer';

export default function App() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [totalCount, setTotalCount] = useState(undefined);

  const { isGuest } = useContext(IsGuestContext);
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [isAdmin, setIsAdmin] = useState(false);
    // ^^ props sent to Home.js ^^
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
    // ^^ first load state (page 1) ^^
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
      fetchData();
  }, []);

  async function fetchData() {
  setLoading(true);

  try {
    // first load before hand off to Home.js / fetchNewData function
    const response = await axios.get(`${apiUrl}/index.php?page=${page}`);

    if (!response) {
      throw new Error('No data received from server');
    }
    
    const responseData = response.data;
    console.log(responseData);
    
    if (responseData.admin_login && getAdminCookie()) {
      setIsAdmin(true);
    }

    let guestLoginSession = undefined;
    let userLoginSession = undefined;
    
    if (typeof window !== 'undefined') {
      const sessionInfo = getSessionData();
      
      if (sessionInfo) {
        const { sessionData } = sessionInfo;

        guestLoginSession = responseData.guest_login && sessionData && Date.now() - sessionData.timestamp < 300000; // 5 Minutes
        // 86400000 is 24 Hours / 60000 is 1 minute / 10000 is 10 seconds
        
        userLoginSession = responseData.user_login && sessionData && Date.now() - sessionData.timestamp < 2592000000; 
        // 1 month in milliseconds

        if (!guestLoginSession && !userLoginSession) {
        // if (!userLoginSession) {
          const sessionKeys = Object.keys(localStorage).filter(key => key.startsWith('myapp-session-'));
          if (sessionKeys.length > 0) {
            const latestSessionKey = sessionKeys.sort().reverse()[0];
            localStorage.removeItem(latestSessionKey); // Remove the session data using the key to avoid duplication.
          }
        }
      } 
      else{
        // console.log("No session data")
        guestLoginSession = false;
        userLoginSession = false; // Set both loggedInSession and loggedInSession2 to false in the case of no session data
      }
    }
    // setLoggedIn(userLoginSession);
    setLoggedIn(userLoginSession || guestLoginSession);
    
    setData(responseData.samplepacks);
    setTotalCount(responseData.total_count);
    setLoading(false);

  } catch (error) {
    console.log('Print the error:', error);
    setLoading(false);
  }
  }

if (loggedIn === undefined) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#101010]">
      <p className="text-white transition-all duration-5000 text-[20vw]">Loading</p>
    </div>
  )
}


return (
<>
<div className="mt-1 sm:mt-8 flex flex-col h-screen">

<div className='max-w-[1600px] w-[99%] m-auto flex-1'>

<div className="relative mt-8 sm:mt-2 border-t-2 border-white">

     { isGuest && <div className="absolute -top-7 left-0 bg-green-50">
        <CountdownTimer /></div>
      }

    <nav className={`transition-all duration-500`}> 
      <HomeNav isGuest={isGuest} isAdmin={isAdmin} loggedIn={loggedIn} />
    </nav>

    <main className={`min-h-screen flex-1 flex opacity-1 transition-opacity duration-500 delay-500`}>
    
    {/* MAIN CONTENT */}
      <Home isAdmin={isAdmin} loggedIn={loggedIn} totalCount={totalCount} />
    </main>

</div>

</div>{/* \container */}

  {/* { data &&
    <div className="mt-auto">
      <Footer />
    </div>
  } */}
  <div className="mt-auto">
    {loading ? null : <Footer />}
  </div>


</div>  
</>
);
}
