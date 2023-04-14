import { useState } from 'react';
import axios from 'axios';

function LogoutBtn() {

  const [loggingOut, setLoggingOut] = useState(false);

  function handleLogout() {
    setLoggingOut(true);

    axios.post('https://toot.olk1.com/api/logout.php')
      .then(response => {
        // console.log(response.data);
        
        // remove cookie (by using a date in the past/expired time)
        document.cookie = 'jello=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        // redirect to login page
        window.location.href = '/';

      })
      .catch(error => {
        console.error(error);
        setLoggingOut(false);
      });
  }

  return (
    <a className="cursor-pointer block my-4 text-xl text-blue-700" disabled={loggingOut} onClick={handleLogout}>
      {loggingOut ? 'Logging out...' : 'Logout'}
    </a>
  );
}

export default LogoutBtn;