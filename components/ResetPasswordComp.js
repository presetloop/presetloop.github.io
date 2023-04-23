import { useState, useEffect, useRef } from 'react';
import {useRouter} from 'next/router';

function ResetPasswordComp({ apiUrl }) {
    const router = useRouter();
    const { token } = router.query;
    const titleField = useRef(null);

    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [data, setData] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // to get input autofocus working
    useEffect(() => {
      if (titleField.current) {
        titleField.current.focus();
      }
    }, []);
    
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
        // Send a POST request to the PHP function with the email and new password
        const response = await fetch(resetPasswordWithToken, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, newPassword, token })
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
          setData('Please try again or check you are using the latest email link');
          setErrorMessage(JSON.parse(responseData));
          setLoading(false);
          return; 
        }
        // Set the message returned by the PHP function
        // success, password reset
        setData(JSON.parse(responseData));
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
            
            <div className="mb-0">
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
                onChange={event => setEmail(event.target.value)}
                pattern="\S+@\S+\.\S+"
              />
            </div>

            <div className="mb-0">
            <label className="mt-2 block text-gray-700 font-bold mb-2">
              New Password:
            </label>
              <input 
                required 
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter a new password"
                type="password" 
                value={newPassword} 
                onChange={event => setNewPassword(event.target.value)}
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                />
            
            <span className="block mt-2 text-slate-400 text-sm">Password must be a minimum of 8 characters containing one uppercase letter, one lowercase letter, at least one number and one special character (e.g., !, @, #, $, %, ^, &, *)</span>
            </div>

            {data && <p className="mt-2 text-blue-500">{data}</p>}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            <button className="my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              {loading ? 'Reseting...' : 'Reset Password'}
            </button>
        </form>
    </div>
    );
}

export default ResetPasswordComp;
