import GuestAccess from "./GuestAccess";

const LoginFormInputs = ({ titleField, handleSubmit, email, setEmail, password, setPassword, inputFieldType, setInputFieldType, loading, errorMessage }) => {
  
  return (
    <div className="max-w-[700px] w-[95%] m-auto">
      
      <div className="flex align-middle justify-between my-4">
        <p className="border-[#F90B0D] border-b-2 text-lg text-slate-600">LOGIN</p>
        
        <div className="flex align-middle">
          <p className="hidden sm:block text-lg text-slate-600">No account?</p>
          <a className="ml-2 block text-lg text-blue-700" href="/register">
            Register Here
          </a>
        </div>
      </div>


      <form autoComplete="off" onSubmit={handleSubmit}>

      <div className="relative">
        {!inputFieldType ? (
          <input
            ref={titleField}
            required
            autoComplete="off"
            className="appearance-none border-slate-900 mb-4 border-b-[1px] w-full py-2 px-0 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email"
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value.trim())}
            pattern="\S+@\S+\.\S+"
          />
        ) : (
          <input
            ref={titleField}
            required
            autoComplete="off"
            className="appearance-none border-slate-900 mb-4 border-b-[1px] w-full py-2 px-0 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value.trim())}
          />
        )}
      </div>


        <div className="relative">
          <input
            required
            autoComplete="off"
            className="appearance-none border-slate-900 mb-8 border-b-[1px] w-full py-2 px-0 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value.trim())}
            // pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
          />
        {errorMessage && <p className="absolute bottom-[5px] left-0 mb-0 text-red-500 text-md">{errorMessage}</p>}
        </div>


        <div className="flex items-center justify-between">
          {inputFieldType ? (
            <input
              className="
              border-green-400 
              border-2 
              hover:bg-green-400 
              bg-white
              hover:text-white
              text-green-400
              font-bold py-0 px-4 text-lg focus:outline-none focus:shadow-outline ease-in-out duration-350
              guestLoginbtnAni"
              type="submit"
              value={loading ? 'Logging in...' : 'Login \u2190'}
              disabled={loading}
            />
          ) : (
            <input
              className="border-slate-900 border-2 hover:bg-slate-900 hover:text-white font-bold py-0 px-4 text-lg focus:outline-none focus:shadow-outline ease-in-out duration-150"
              type="submit"
              value={loading ? 'Logging in...' : 'Login'}
              disabled={loading}
            />
          )}
        </div>

      </form>
      <p className="mt-3">
        <a href='/password-reset'>Forgot password?</a>
      </p>

      <GuestAccess setEmail={setEmail} setPassword={setPassword} setInputFieldType={setInputFieldType} />
    </div>// \container
  );
};

export default LoginFormInputs;
