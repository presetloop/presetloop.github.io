import { useContext, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import IsGuestContext from '@/helpers/IsGuestContext';
import generateUniqueKey from '@/helpers/generateUniqueKey';
import LoginFormInputs from './LoginFormInputs'
import {setCookie} from '@/helpers/handleCookies';

export default function LoginForm({ apiUrl }) {
  const { setIsGuest } = useContext(IsGuestContext);

  const titleField = useRef(null);
  const router = useRouter();
  
  const [csrfToken, setCsrfToken] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputFieldType, setInputFieldType] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // to get input autofocus working
  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  }, []);

  // Fetch the CSRF token on component mount
  useEffect(() => {
    getCsrfToken();
  }, []);

  const getCsrfToken = async () => {
    try {
      const response = await axios.get(`${apiUrl}/csrf.php`);
      const get_csrfToken = response.data.csrf_token;
      setCsrfToken(get_csrfToken);

    } catch (error) {
      console.error('Failed to fetch CSRF token:', error);
    }
  };


  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

    // Validate email
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      setLoading(false);
      return;
    }
    try {
      // console.log('Sending login request');
      const response = await axios.post(`${apiUrl}/login.php`, {
        email: email,
        password: password,
        csrfToken: csrfToken
      });
      // console.log();
      // console.table('Login request response:', response);

      const responseData = response.data;
      // console.log('Login response data:', responseData);
      if (!responseData) {
        throw new Error('No data received from server');
      }
      
      // Admin Login
      if (responseData.success && responseData.admin === "admin") {
        // console.log(responseData.admin)
        setCookie("admin", "adminOnly", 1)
        router.push('/');
      } 

      // Guest Login
      if (responseData.success) {
        const GuestloggedIn = responseData.message === 'Guest Login successful';

        if(GuestloggedIn) {
          setIsGuest(true);
        } else{
          setIsGuest(false);
        }

      // Registered User Login
        const UserloggedIn = responseData.message === 'User Login successful';
        
        if (UserloggedIn || GuestloggedIn) {
          // imported helper function
          const uniqueKey = generateUniqueKey('myapp-session');
          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem(uniqueKey, JSON.stringify({ value: process.env.NEXT_PUBLIC_SESSION, timestamp: Date.now() }));
          }
          router.push('/');
        } else {
          router.push('/login');
        }
      } else {
        setErrorMessage('Invalid email or password');
      }


    } catch (error) {
      // console.error(error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoginFormInputs titleField={titleField} handleSubmit={handleSubmit} email={email} setEmail={setEmail} password={password} setPassword={setPassword} loading={loading} errorMessage={errorMessage} inputFieldType={inputFieldType} setInputFieldType={setInputFieldType} />
    </>
  );
}
