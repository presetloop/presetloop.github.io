import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import LoginFormInputs from './LoginFormInputs'

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
      console.log('Sending login request');
      const response = await axios.post(`${apiUrl}/login.php`, {
        email: email,
        password: password,
      });
      console.log('Login request response:', response);

      const responseData = response.data;
      console.log('Login response data:', responseData);
      if (!responseData) {
        throw new Error('No data received from server');
      }

      if (responseData.success) {

          console.log('Updating login status');
          const loggedIn = responseData.message == 'Login successful and Session cookie set successfully';
        
          if (loggedIn) {
            localStorage.setItem("session", "jelli");
            router.push('/');
          } else {
            router.push('/login');
          }

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
    <LoginFormInputs handleSubmit={handleSubmit} email={email} setEmail={setEmail} password={password} setPassword={setPassword} loading={loading} errorMessage={errorMessage} />
  );
}

export default LoginForm;
