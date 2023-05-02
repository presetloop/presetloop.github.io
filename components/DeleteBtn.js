import React, { useState } from 'react';
import {useRouter} from 'next/router'

function DeleteBtn(props) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    const confirmed = window.confirm('Are you sure?');
    if (!confirmed) {
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch(`${apiUrl}/delete_row.php?id=${props.id}`, {
        method: 'DELETE'
      })
      if (response.status === 204) {
        router.push("/");
      } else if (response.status === 200) {
        // console.log('Success');
        router.push("/");
      } else {
        // Handle any other non-204 response status codes here
        console.error(`Unexpected response status: ${response.status}`);
      }
      
    } catch (error) {
      // Handle any network errors here
      console.error(`Network error: ${error.message}`);
    }
    setLoading(false);

  }

  return (
    
      <p className="-mt-1 px-4 border-t-2 border-[#F90B0D] w-[95%] cursor-pointer">
        <a className="block p-1 sm:p-2 bg-[#F90B0D] w-fit text-sm sm:text-md text-white sm:hover:text-black ease-in-out sm:hover:scale-105 sm:hover:transition-all duration-300" onClick={handleClick}>
          {loading ? 'DELETING...' : 'DELETE'}
        </a>
     </p>

  );
}

export default DeleteBtn;
