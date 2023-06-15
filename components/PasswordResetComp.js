import React, { useState, useEffect, useRef } from 'react';
import {useRouter} from 'next/router';
// import PropTypes from 'prop-types';

function PasswordResetComp({ apiUrl }) {
  const router = useRouter();
  const titleField = useRef(null);

  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);

  // to get input autofocus working
  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  }, []);


  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value.trim());
  };

  const handleSubmit = async (event) => {
  setLoading(true);
  event.preventDefault();

  // Validate email
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    setErrorMessage('Please enter a valid email address.');
    return;
  }

  // Send password reset email
  const resetLink = `${apiUrl}/password_reset.php`;
  try {
    const response = await fetch(resetLink, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });
    if (!response.ok) {
      throw new Error('Unable to send password reset email. Please try again later.');
    }
    const responseData = await response.text();
    if (responseData === '') {
      throw new Error('No data received from server');
    }

    // Set the message returned by the PHP function
    if(JSON.parse(responseData) === "No user found with that email address."){
      setData('Please try again');
      setErrorMessage(JSON.parse(responseData));
      setLoading(false);
      return; 
    }

    // Set the message returned by the PHP function
    // Success, email sent redirect to login page
    setData(JSON.parse(responseData));
    setErrorMessage('');
    setEmail('');
    setTimeout(() => {
      router.push("/")
    }, 3000);
    setLoading(false);
  } catch (error) {
    console.error(error);
    setErrorMessage(error.message);
  }
};

  return (
    <form className="max-w-[700px] w-[95%] m-auto" onSubmit={handleSubmit}>
      <div className="relative">
        <input 
          ref={titleField}
          required
          className="appearance-none border-slate-900 mb-4 border-b-[1px] w-full py-2 px-0 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter your email"
          type="email" 
          value={email} 
          onChange={handleEmailChange} 
          pattern="\S+@\S+\.\S+"
        />

      {data && <p className="mt-2 text-blue-500 absolute -bottom-[10px] left-0 mb-0 text-md">{data}</p>}
      {errorMessage && <p className="absolute -bottom-[35px] left-0 mb-0 text-red-500 text-md">{errorMessage}</p>}
      </div>

      <button className="my-10 border-slate-900 border-2 sm:hover:bg-slate-900 sm:hover:text-white font-bold py-0 px-4 text-lg focus:outline-none focus:shadow-outline ease-in-out duration-150" type="submit">
        {loading ? 'Sending...' : 'Send password reset link'}
      </button>
    </form>
  );
}

// ResetPassword.propTypes = {
//   apiUrl: PropTypes.string.isRequired
// };

export default PasswordResetComp;
