const LoginFormInputs = ({ titleField, handleSubmit, email, setEmail, password, setPassword, loading, errorMessage }) => {
  
  return (
    <div className="max-w-[700px] w-[95%] m-auto">
      
      <div className="flex align-middle justify-end my-4">
        <p className="block text-lg text-slate-600">No account?</p>
        <a className="ml-2 block text-lg text-blue-700" href="/register">
          Register Here
        </a>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email:
          </label>
          <input
            ref={titleField}
            required
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email"
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            pattern="\S+@\S+\.\S+"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
            Password:
          </label>
          <input
            required
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            // pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
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
};

export default LoginFormInputs;
