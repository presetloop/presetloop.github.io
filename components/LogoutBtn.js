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
      <div
        className="-mt-0.5 cursor-pointer bg-[#F90B0D]"
        disabled={loggingOut}
        onClick={handleClick}
      >
        <p className='block px-2 sm:px-2 pt-1 mt-[1.5px] mb-1.5 text-sm sm:text-md text-white sm:hover:text-white ease-in-out sm:hover:scale-110 sm:hover:transition-all duration-300'>
            {loggingOut && window.innerWidth < 480 ? 'Out...' : loggingOut ? 'Logging out...' : window.innerWidth < 480 ? 'Logout' : 'Logout'}
        </p>
      </div>
  );
}

export default LogoutBtn;
