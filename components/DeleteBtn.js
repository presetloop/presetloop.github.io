import React, { useState } from 'react';
import {useRouter} from 'next/router'

function DeleteBtn(props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    const confirmed = window.confirm('Are you sure?');
    if (!confirmed) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://toot.olk1.com/api/delete-row.php?id=${props.id}`, {
        method: 'DELETE'
      });

      if (response.status === 204) {
        router.push("/")
      } else if (response.status === 200) {
        // console.log('Success');
        router.push("/")
      } else {
        // Handle any other non-204 response status codes here
        console.error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      // Handle any network errors here
      console.error(`Network error: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? <p className='mt-2 text-xs text-slate-700 p-1 rounded border-red-500 border-2'>Deleting...</p> : <p className='mt-2 text-xs text-slate-700 p-1 rounded border-red-500 border-2'>Delete</p>}
    </button>
  );
}

export default DeleteBtn;
