import { useRef, useEffect, useState } from 'react';
import {useRouter} from 'next/router'
import axios from 'axios';

function RegistrationForm({apiUrl}) {
    const titleField = useRef(null);
    const router = useRouter();

    const [csrfToken, setCsrfToken] = useState('');

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
          return;
        }

        try {
            const response = await axios.post(`${apiUrl}/register.php`, {
                email: email,
                password: password,
                csrfToken: csrfToken
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

      <div className="flex align-middle justify-between my-4">
        <p className="border-[#F90B0D] border-b-2 text-lg text-slate-600">REGISTER</p>
        
        <div className="flex align-middle">
          <p className="hidden sm:block text-lg text-slate-600">Already registered?</p>
          <a className="ml-2 block text-lg text-blue-700" href="/login">
            Login here
          </a>
        </div>
      </div>
    
        <form onSubmit={handleSubmit}>
          
          <div className="relative">
            <input
              ref={titleField}
              required
              className="appearance-none border-slate-900 mb-4 border-b-[1px] w-full py-2 px-0 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value.trim())}
              pattern="\S+@\S+\.\S+"
            />
          </div>

            <div className="relative">
              <input
                required
                className="appearance-none border-slate-900 mb-4 border-b-[1px] w-full py-2 px-0 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter a password"
                type="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value.trim())}
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
              />
            
            <span className="block my-2 text-slate-400 text-sm">Password must be a minimum of 8 characters containing one uppercase letter, one lowercase letter, at least one number and one special character (e.g., !, @, #, $, %, ^, &, *)</span>
            </div>

            {data && <p className="mt-2 text-blue-500">{data.success}</p>}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            <div className="flex items-center justify-between">
              <input className="my-2 border-slate-900 border-2 sm:hover:bg-slate-900 sm:hover:text-white font-bold py-0 px-4 text-lg focus:outline-none focus:shadow-outline ease-in-out duration-150" type="submit" 
              value={loading ? 'Registering...' : 'Register'} />
            </div>
        </form>
      </div>
    );
}

export default RegistrationForm;
