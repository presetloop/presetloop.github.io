import React, { useState } from 'react';

function DeleteBtn(props) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/edit?id=${props.id}`;
  }
   
  return (
    
      <p className="-mt-1 px-0 border-t-2 border-green-500 w-[95%] cursor-pointer">
        <a className="block p-1 sm:p-2 bg-green-500 w-fit text-sm sm:text-md text-white sm:hover:text-black ease-in-out sm:hover:scale-105 sm:hover:transition-all duration-300" onClick={handleClick}>
          {loading ? 'EDITING...' : 'EDIT'}
        </a>
     </p>

  );
}

export default DeleteBtn;
