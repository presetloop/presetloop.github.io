import GuestAccess from "./GuestAccess";

const LoginFormInputs = ({ titleField, handleSubmit, email, setEmail, password, setPassword, inputFieldType, setInputFieldType, loading, errorMessage }) => {
  const cta = "Guest Pass GO!"  
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


      <form onSubmit={handleSubmit}>

      <div className="relative">
        {!inputFieldType ? (
          <>
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

          <div className="relative">
          <input
            required
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

          </>
      
        ) : (  
          // Guest pass activated
          <>
          <input
            ref={titleField}
            required
            className="appearance-none border-slate-900 mb-4 border-b-[1px] w-full py-2 px-0 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email"
            type="hidden"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value.trim())}
            pattern="\S+@\S+\.\S+"
          />
 
          <input
            ref={titleField}
            required
            autoComplete="off"
            className="appearance-none border-slate-900 mb-4 border-b-[1px] w-full py-2 px-0 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"
            type="hidden"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value.trim())}
          />
          </>
      
        )}
      </div>


        
        {/* Button animation for guest login */}
        <div className="flex items-center justify-between">
          {inputFieldType ? (
            <input
              className="
              border-green-600 
              border-2 
              bg-green-600 
              sm:hover:bg-white
              text-white
              text-lg
              sm:hover:text-green-400
              mt-2
              font-bold py-1 px-5 focus:outline-none focus:shadow-outline ease-in-out duration-350
              guestLoginbtnAni"
              type="submit"
              value={loading ? cta+"..." : cta}
              disabled={loading}
            />
          ) : (
            <input
              className="border-slate-900 border-2 sm:hover:bg-slate-900 sm:hover:text-white font-bold py-0 px-4 text-lg focus:outline-none focus:shadow-outline ease-in-out duration-150"
              type="submit"
              value={loading ? 'Logging in...' : 'Login'}
              disabled={loading}
            />
          )}
        </div>

      </form>

      {!inputFieldType && <p className="mt-3">
        <a href='/password-reset'>Forgot password?</a>
      </p>}
      
      {!inputFieldType && <GuestAccess setEmail={setEmail} setPassword={setPassword} setInputFieldType={setInputFieldType} />}
      
      {inputFieldType && <p className="mt-6">
        The 5 Minute Guest Pass gives you full access to the entire site. A countdown timer will begin once you click the "{cta}" button, from which point you will have 5 minutes to peruse all the currently available resources.<br /><br />
        If you like what you find, considering becoming a <a className="inline-block text-md text-blue-700" href="/register">Registered User</a>.
      </p>
      }

    </div>// \container
  );
};

export default LoginFormInputs;
