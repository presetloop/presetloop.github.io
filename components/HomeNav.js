import LogoutBtn from '@/components/LogoutBtn';

export default function HomeNav({isGuest, isAdmin, loggedIn}) {
  
  return (
    <>
     
    { isAdmin || loggedIn ? (
      <>
      <div className="flex gap-2 justify-between">

      <div className={`flex text-white sm:hover:text-black ${isGuest ? "ml-24 sm:ml-80" : ""}`}>
          
      <a href={isAdmin ? "/form" : "/"}>
          
            <img className={`invert -mt-4 h-auto w-16 transition-all ease-in-out duration-1000 cursor-pointer`} src="/pl-logo-trans.png" alt="Preset Loop" />
          
      </a>

      </div>

            
          <div className="mt-0.5 flex gap-2">
            <a className="block" href="/search">
              <p className="border-white border-2 border-b-0 -mt-7 px-1 text-md sm:-mt-8 sm:px-4 sm:text-lg text-white sm:hover:bg-white sm:hover:text-black ease-in-out duration-300">Search</p>
            </a>
            <LogoutBtn />
          </div>
        </div>
      </>
      ) : (

        <div className="flex justify-between">

          <div className="flex text-white sm:hover:text-black">
            <a href="/login">
              
              <img className="invert -mt-4 h-auto w-16 transition-all ease-in-out duration-1000 cursor-pointer" src="/pl-logo-trans.png" alt="Preset Loop" />

            </a>
          </div>
          
          <div className="mt-0.5 flex gap-2">
            <a className="hidden sm:block" href="/register">
              <p className="border-white border-0 -mt-7 px-1 text-md sm:hover:bg-green-400 text-white ease-in-out duration-300">Register</p>
            </a>
            <a className="block" href="/login">
              <p className="border-white border-2 border-b-0 -mt-7 px-4 text-md sm:hover:bg-green-400 text-white ease-in-out duration-300">Login</p>
            </a>
          </div>

        </div>
        
      )}
    </>
  )
}