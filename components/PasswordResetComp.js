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
      router.push("/login")
    }, 3000);
    setLoading(false);
  } catch (error) {
    console.error(error);
    setErrorMessage(error.message);
  }
};

  return (
    <form className="max-w-[700px] w-[95%] m-auto" onSubmit={handleSubmit}>
      <label className="block text-gray-700 font-bold mb-2">
        Email:
      </label>
        <input 
          ref={titleField}
          required
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter your email"
          type="email" 
          value={email} 
          onChange={handleEmailChange} 
          pattern="\S+@\S+\.\S+"
        />

      {data && <p className="mt-2 text-blue-500">{data}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      
      <button className="my-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        {loading ? 'Sending...' : 'Send password reset link'}
      </button>
    </form>
  );
}

// ResetPassword.propTypes = {
//   apiUrl: PropTypes.string.isRequired
// };

export default PasswordResetComp;
