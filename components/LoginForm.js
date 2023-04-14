import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

function LoginForm({ apiUrl }) {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

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
      const response = await axios.post(`${apiUrl}/login.php`, {
        email: email,
        password: password,
      });

      const responseData = response.data;
      if (!responseData) {
        throw new Error('No data received from server');
      }

      if (responseData.success) {

        const sessionId = response.data.session_id;
        if (sessionId) {
          document.cookie = `jello=${sessionId}; path=/`;
        } else {
          router.push('/login');
        }
        router.push('/');
      } else {
        setErrorMessage('Invalid email or password');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[700px] w-[95%] m-auto">
      <div className="flex justify-end">
        <a className="block my-4 text-xl text-blue-700" href="/register">
          Register
        </a>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email:
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            pattern="\S+@\S+\.\S+"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
            Password:
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <div className="flex items-center justify-between">
          <input
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            value={loading ? 'Logging in...' : 'Login'}
            disabled={loading}
          />
        </div>
      </form>
      <p className="mt-3">
        <a href='/password-reset'>Forgot password?</a>
      </p>
    </div>
  );
}

export default LoginForm;
