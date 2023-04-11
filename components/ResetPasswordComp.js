import { useState, useEffect, useRef } from 'react';
import {useRouter} from 'next/router';

function ResetPasswordComp({ apiUrl }) {
    const router = useRouter();
    const titleField = useRef();

    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
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

    // Send password reset email
    const resetLink = `${apiUrl}/reset_password.php`;
    try {
        // Send a POST request to the PHP function with the email and new password
        const response = await fetch(resetLink, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, newPassword })
        });

        const data = await response.json();

        // Set the message returned by the PHP function
        setMessage(data.message);
        setErrorMessage('');
        setEmail('');
        // setTimeout(() => {
        //   router.push("/login")
        // }, 3000);
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
            <label className="block text-gray-700 font-bold mb-2">
              Email
            </label>
              <input 
                ref={titleField}
                required 
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your email"
                type="email" 
                value={email} 
                onChange={event => setEmail(event.target.value)} />
            <label className="mt-2 block text-gray-700 font-bold mb-2">
              New Password
            </label>
              <input 
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter a new password"
                required 
                type="password" 
                value={newPassword} 
                onChange={event => setNewPassword(event.target.value)} />
            {message && <p className="mt-2 text-blue-500">{message}</p>}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            <button className="my-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              {loading ? 'Reseting...' : 'Reset Password'}
            </button>
        </form>
    </div>
    );
}

export default ResetPasswordComp;
