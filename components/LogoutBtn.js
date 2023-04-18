import { useState } from 'react';

function LogoutBtn() {

  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    
    try {
      const res = await fetch('https://toot.olk1.com/api/logout.php');
      const json = await res.json();
      
      if(json.logged_in == false){
        setLoggingOut(true);
        localStorage.removeItem("session", "jelli");;
        window.location.href = '/';
      }
      
      } catch (error) {
          console.error(error);
          setLoggingOut(false);
      }

      // document.cookie = `${loggedOut}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  return (
    <a className="cursor-pointer block my-4 text-xl text-blue-700" disabled={loggingOut} onClick={handleLogout}>
      {loggingOut ? 'Logging out...' : 'Logout'}
    </a>
  );
}

export default LogoutBtn;