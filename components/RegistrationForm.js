import { useRef, useEffect, useState } from 'react';
import {useRouter} from 'next/router'
import axios from 'axios';

function RegistrationForm({apiUrl}) {
    const titleField = useRef(null);
    const router = useRouter();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(false);

    // to get input autofocus working
    useEffect(() => {
      if (titleField.current) {
        titleField.current.focus();
      }
    }, []);
    
    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();

        // Validate email
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
          setErrorMessage('Please enter a valid email address.');
          return;
        }

        try {
            const response = await axios.post(`${apiUrl}/register.php`, {
                email: email,
                password: password
            });

            const responseData = response.data;
            if (!responseData) {
              throw new Error('No data received from server');
            }
            if(responseData.message){
              setErrorMessage(responseData.message);
              return;
            }

            setData(responseData);
            setErrorMessage('');
            router.push("/login")
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
      <div className="max-w-[700px] w-[95%] m-auto">

      <div className="flex align-middle justify-end my-4">
        <p className="block text-lg text-slate-600">Already registered?</p>
        <a className="ml-2 block text-lg text-blue-700" href="/login">
          Login here
        </a>
      </div>
    
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-gray-700 font-bold mb-2"  htmlFor="email">Email:</label>
            <input
              ref={titleField}
              required
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value.trim())}
              pattern="\S+@\S+\.\S+"
            />
          </div>

            <div className="mb-2">
              <label className="block text-gray-700 font-bold mb-2"  htmlFor="password">Password:</label>
              <input
                required
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter a password"
                type="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value.trim())}
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
              />
            
            <span className="block mt-2 text-slate-400 text-sm">Password must be a minimum of 8 characters containing one uppercase letter, one lowercase letter, at least one number and one special character (e.g., !, @, #, $, %, ^, &, *)</span>
            </div>

            {data && <p className="mt-2 text-blue-500">{data.success}</p>}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            <div className="flex items-center justify-between">
              <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" 
              value={loading ? 'Registering...' : 'Register'} />
            </div>
        </form>
      </div>
    );
}

export default RegistrationForm;
