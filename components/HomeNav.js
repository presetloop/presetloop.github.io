import LogoutBtn from '@/components/LogoutBtn';

export default function HomeNav({isGuest, isAdmin, loggedIn}) {
  
  return (
    <>
     
    { isAdmin || loggedIn ? (
      <>

      <div className="flex gap-2 justify-between">

      <div className={`flex text-white sm:hover:text-black ${isGuest ? "ml-24 sm:ml-80" : ""}`}>
          
      <a href={isAdmin ? "/form" : "/"}>
          <p className='-mt-[24px] [word-spacing:-0px]'>pre</p>
          <p className="-mt-[21px] ml-6 mr-6 px-2 bg-transparent ease-in-out duration-300">
            <img className="invert h-10 w-10 transition-all ease-in-out duration-1000" src="/loop.svg" alt="Preset Loop" />
          </p>
          <p className='-mt-[43px] ml-[74px] [word-spacing:-0px]'>set</p> 
      </a>

      </div>

            
          <div className="flex gap-2">
            <a className="block" href="/search">
              <p className="border-white border-2 border-b-0 -mt-7 px-1 text-md sm:-mt-8 sm:px-4 sm:text-lg text-white ease-in-out duration-300">Search</p>
            </a>
            <LogoutBtn />
          </div>
        </div>
      </>
      ) : (

        <div className="flex justify-between">

          <div className="flex text-black hover:text-white">
            <a href="/login">
              <p className='-mt-[24px] [word-spacing:-0px]'>pre</p>
              <p className="-mt-[21px] ml-6 mr-6 px-2 bg-transparent ease-in-out duration-300">
                <img className="invert h-10 w-10 transition-all ease-in-out duration-1000" src="/loop.svg" alt="Preset Loop" />
              </p>
              <p className='-mt-[43px] ml-[74px] [word-spacing:-0px]'>set</p>
            </a>
          </div>
          
          <div className="flex gap-2">
            <a className="hidden sm:block" href="/register">
              <p className="border-white border-0 -mt-7 px-1 text-md hover:bg-green-400 text-white ease-in-out duration-300">Register</p>
            </a>
            <a className="block" href="/login">
              <p className="border-white border-2 border-b-0 -mt-7 px-4 text-md hover:bg-green-400 text-white ease-in-out duration-300">Login</p>
            </a>
          </div>

        </div>
        
      )}
    </>
  )
}