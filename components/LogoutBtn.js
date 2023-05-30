import { useState } from 'react';
import getSessionData from '@/helpers/getSessionData';
import { removeCookie } from '@/helpers/handleCookies';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function handleLogout() {
    // console.log("Loggout Out...")  
    try {
      const res = await fetch(`${apiUrl}/logout.php`);
      const json = await res.json();

      if (json.admin === false || json.guest_login === false) {
        if (typeof window !== 'undefined') {
          removeCookie('admin');
          // window.location.href = '/';
        }

        // Check if localStorage is available
        if (typeof window !== 'undefined' && window.localStorage) {
          const sessionDataObj = getSessionData();
          if (sessionDataObj && sessionDataObj.sessionData) {
            const { sessionData, sessionKey } = sessionDataObj;
            localStorage.removeItem(sessionKey); // delete session
            localStorage.removeItem('data'); // reset pagination
          }
        }
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    };
  
}

function LogoutBtn() {
  const [loggingOut, setLoggingOut] = useState(false);

  const handleClick = async () => {
    setLoggingOut(true);
    handleLogout();
    setLoggingOut(false);
  };

  return (
    <p className='-mt-1 cursor-pointer bg-[#F90B0D] px-2 sm:px-4'>
      <a
        className="block pt-1 mt-0.5 sm:-mt-[0.5px] text-sm sm:text-lg text-white hover:text-black ease-in-out sm:hover:scale-105 sm:hover:transition-all duration-300"
        disabled={loggingOut}
        onClick={handleClick}
      >
        {loggingOut && window.innerWidth < 480 ? 'Out...' : loggingOut ? 'Logging out...' : window.innerWidth < 480 ? 'Logout' : 'Logout'}
      </a>
    </p>
  );
}

export default LogoutBtn;
