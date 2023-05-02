import { useState } from 'react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function LogoutBtn() {

  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    
    try {
      const res = await fetch(`${apiUrl}/logout.php`);
      const json = await res.json();
      
      if(json.logged_in == false){
        setLoggingOut(true);
        localStorage.removeItem("session", process.env.NEXT_PUBLIC_SESSION);;
        window.location.href = '/';
      }
      
      } catch (error) {
          console.error(error);
          setLoggingOut(false);
      }

      // document.cookie = `${loggedOut}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  return (
    <p className='-mt-1 cursor-pointer bg-[#F90B0D] px-2 sm:px-4'>
      <a className="block pt-1 mt-0.5 sm:-mt-[0.5px] text-sm sm:text-lg text-white hover:text-black ease-in-out sm:hover:scale-105 sm:hover:transition-all duration-300" disabled={loggingOut} onClick={handleLogout}>
        {loggingOut && window.innerWidth < 480 ? 'Out...' : loggingOut ? 'Logging out...' : window.innerWidth < 480 ? 'Logout' : 'Logout'}
      </a>
    </p>
  );
}

export default LogoutBtn;