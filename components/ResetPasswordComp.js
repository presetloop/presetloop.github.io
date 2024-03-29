import { useState, useEffect, useRef } from 'react';
import {useRouter} from 'next/router';
import axios from 'axios';

function ResetPasswordComp({ apiUrl }) {
    const router = useRouter();
    const { token } = router.query;
    const titleField = useRef(null);

    const [csrfToken, setCsrfToken] = useState('');

    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [data, setData] = useState('');
    const [retry, setRetry] = useState('');
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

    async function handleResetPassword(event) {
    setLoading(true);
    event.preventDefault();
    
    // Validate email
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if(!token){
      router.push("/password-reset");
      return;
    }   

    // Submit password link and token to database
    const resetPasswordWithToken = `${apiUrl}/reset_password.php`;
    
    try {
        // Send a POST request to the PHP function with the email and new password, the token and csrf validation.
        const response = await fetch(resetPasswordWithToken, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, newPassword, token, csrfToken })
        });
        if (!response.ok) {
          throw new Error('Unable to reset your password. Please try again later.');
        }
        const responseData = await response.text();
        if (responseData === '') {
          throw new Error('No data received from server');
        }
        
        // Set the message returned by the PHP function
        if(JSON.parse(responseData) === "No user found with that email address or token."){
          setRetry('Please try again or check you are using the latest email link');
          setData("");
          setErrorMessage(JSON.parse(responseData));
          setLoading(false);
          return; 
        }
        // Set the message returned by the PHP function
        // success, password reset
        setData(JSON.parse(responseData));
        setRetry("");
        setErrorMessage('');
        setEmail('');
        setNewPassword('');
        setTimeout(() => {
          router.push("/login");
        }, 3000);
        setLoading(false);
    } catch (error) {
        // Log any errors that occur
        console.error(error);
        setErrorMessage(error.message);
    }
}

    return (
      <div className="max-w-[700px] w-[95%] m-auto">
        <form onSubmit={handleResetPassword}>
            
            <div className="relative">
              <input 
                ref={titleField}
                required 
                className={`${data && "hidden"} appearance-none border-slate-900 mb-4 border-b-[1px] w-full py-2 px-0 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                placeholder="Enter your email"
                type="email" 
                value={email} 
                onChange={event => setEmail(event.target.value.trim())}
                pattern="\S+@\S+\.\S+"
              />
            </div>

            <div className="relative">
              <input 
                required 
                className={`${data && "hidden"} appearance-none border-slate-900 mb-4 border-b-[1px] w-full py-2 px-0 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                placeholder="Enter a new password"
                type="password" 
                value={newPassword} 
                onChange={event => setNewPassword(event.target.value.trim())}
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                />
            
            {data && <p className="mt-2 text-blue-500 absolute -bottom-[10px] left-0 mb-0 text-xl">{data}</p>}
            
            {errorMessage && <p className="absolute -bottom-[35px] left-0 mb-0 text-red-500 text-md">{errorMessage}</p>}
            </div>

            <p className={`${data && "hidden"} mt-8 text-slate-400 text-sm`}>Password must be a minimum of 8 characters containing one uppercase letter, one lowercase letter, at least one number and one special character (e.g., !, @, #, $, %, ^, &, *)</p>

            <button className={`${data && "hidden"} mt-4 border-slate-900 border-2 sm:hover:bg-slate-900 sm:hover:text-white font-bold py-0 px-4 text-lg focus:outline-none focus:shadow-outline ease-in-out duration-150`} type="submit">
              {loading ? 'Reseting...' : 'Reset Password'}
            </button>
        </form>
    </div>
    );
}

export default ResetPasswordComp;
