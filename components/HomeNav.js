import LogoutBtn from '@/components/LogoutBtn';

export default function HomeNav({isAdmin, loggedIn}) {
  
  return (
    <>
     
    { isAdmin || loggedIn ? (
      <>

        <div className="flex gap-2 justify-between">
          
            <a className="block" href={isAdmin ? "/form" : "/"}>
              <p className="mt-1 -rotate-1 bg-[#1A0123] px-2 sm:px-12 text-md sm:text-lg text-white sm:hover:pl-10 sm:hover:pr-10 ease-in-out duration-300">{`${process.env.NEXT_PUBLIC_BRAND}`}</p>
            </a>
            
          <div className="flex gap-2">
            <a className="block" href="/search">
              <p className="border-slate-900 border-2 -mt-6 px-1 text-md sm:-mt-7 sm:px-4 sm:text-lg text-slate-900 hover:bg-slate-900 hover:text-white ease-in-out duration-300">Search</p>
            </a>
            <LogoutBtn />
          </div>
        </div>
      </>
      ) : (

        <div className="flex justify-between">

          <div className="flex text-white hover:text-black">
            <a href="/login">
              <p className='-mt-[24px] [word-spacing:-0px]'>pre</p>
              <p className="-mt-[21px] ml-6 mr-6 px-2 bg-transparent ease-in-out duration-300">
                <img className="h-10 w-10" src="/loop.svg" alt="Preset Loop" />
              </p>
              <p className='-mt-[43px] ml-[74px] [word-spacing:-0px]'>set</p>
            </a>
          </div>
          
            <div className="flex gap-2">
            <a className="hidden sm:block" href="/register">
              <p className="border-slate-900 border-0 -mt-7 px-1 text-md text-slate-900 hover:bg-green-400 hover:text-white ease-in-out duration-300">Register</p>
            </a>
            <a className="block" href="/login">
              <p className="border-slate-900 border-2 -mt-7 px-4 text-md text-slate-900 hover:bg-green-400 hover:text-white ease-in-out duration-300">Login</p>
            </a>
          </div>

        </div>
        
      )}
    </>
  )
}