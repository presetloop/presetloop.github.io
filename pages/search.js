import { useContext, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import IsGuestContext from '@/helpers/IsGuestContext';
import CountdownTimer from '@/components/CountdownTimer';
import {getAdminCookie} from '@/helpers/handleCookies';
import getSessionData from '@/helpers/getSessionData';
import DOMPurify from 'dompurify';
// import validUrl from 'valid-url';

// const baseUrl = 'http://localhost:5000';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function Search() {
  const router = useRouter();
  const { isGuest } = useContext(IsGuestContext);
  const [admin, setAdmin] = useState(false);
  // const postUrl = `${baseUrl}/post?id=${id}`;
  // const loginUrl = `${baseUrl}/login`;
  // const href = loggedIn ? postUrl : loginUrl;

  // const isValidHref = validUrl.isWebUri(href);

  const searchField = useRef(null);
  // const [loggedIn, setLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchErrorMessage, setSearchErrorMessage] = useState(false);
  const [disableSearchBtn, setDisableSearchBtn] = useState(false);

  // If not logged in, redirect.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const getCookie = getAdminCookie();
      const sessionData = getSessionData();
      if ((!sessionData === true) && !getCookie) {
        router.push('/login');
        return;
      } 
      if(getCookie){
        setAdmin(true)
      }
    }
  }, []);


  
  // Autofocus search field on load
  useEffect(() => {
    if (searchField.current) {
      searchField.current.focus();
    }
  }, []);

  async function handleSearch(e) {
    e.preventDefault();

    if(searchTerm === ""){
      setSearchErrorMessage("Enter a search term above")
      // setDisableSearchBtn(true);
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/search.php`, {
        method: 'POST',
        body: JSON.stringify({ searchTerm }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const results = await response.json();
      // console.log(results)
      setSearchResults(results);
      setFormSubmitted(true);
      setLoading(false);
      setSearchTerm("");
      setSearchErrorMessage("")
    } catch (error) {
      // console.error(error);
      setSearchErrorMessage(error);
      setDisableSearchBtn(true);
      setLoading(false);
    }
  };

  const handleInputChange = event => {
    setSearchTerm(event.target.value);
  };

  if (loading) {
    return <p className={`text-slate-200 transition-all duration-5000 flex items-center justify-center h-screen -mt-[100px] text-[8vw]`}>Loading...</p>;
  }


return (
<>
    <div className="relative max-w-[700px] w-[95%] m-auto">


    <div className="flex w-full mt-8 sm:mt-10 border-t-2 border-slate-900">
  
    { isGuest && <div className="absolute -top-6 left-0 bg-green-50">
      <CountdownTimer /></div>
    }

      {isGuest ? (
      <nav className={`w-full flex text-white sm:hover:text-black`}>
          <div className='ml-auto pl-20 sm:pl-48'>
          <a href={"/"}>
            <p className='-mt-[24px] [word-spacing:-0px]'>pre</p>

            <p className="-mt-[21px] ml-7 px-2 bg-transparent ease-in-out duration-300">
              <img className="h-10 w-10 transition-all ease-in-out duration-1000" src="/loop.svg" alt="Preset Loop" />
            </p>

            <p className='-mt-[43px] ml-20 [word-spacing:-0px]'>set</p> 
          </a>
          </div>
          <div className='ml-auto'>
            <a className="block my-0 bg-[#1A0123] px-4 sm:px-12 text-lg text-white ease ease-in-out duration-300 sm:hover:pl-8 sm:hover:pr-8" href="/">View all</a>
          </div>
      </nav>
      ) : (
      <nav className={`w-full flex space-between text-white sm:hover:text-black`}>
        <div>
          <a href={"/"}>
          <p className='-mt-[24px] [word-spacing:-0px]'>pre</p>

          <p className="-mt-[21px] ml-7 px-2 bg-transparent ease-in-out duration-300">
            <img className="h-10 w-10 transition-all ease-in-out duration-1000" src="/loop.svg" alt="Preset Loop" />
          </p>

          <p className='-mt-[43px] ml-20 [word-spacing:-0px]'>set</p> 
        </a>
        </div>

        <div className='ml-auto'>
          <a className="inline-block my-0 bg-[#1A0123] px-4 sm:px-12 text-lg text-white ease ease-in-out duration-300 sm:hover:pl-8 sm:hover:pr-8" href="/">View all</a>
        </div>
      </nav>
      )}
      
    </div>




    <div className="relative mt-8">
      <input
        ref={searchField}
        required
        className="appearance-none border-slate-900 mb-8 border-b-[1px] w-full py-2 px-0 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="title"
        type="text"
        placeholder="Enter a search query"
        name="Title"
        value={searchTerm} 
        onChange={handleInputChange}
      />
      {searchErrorMessage && <p className="absolute bottom-[5px] left-0 mb-0 text-red-500 text-md">{searchErrorMessage}</p>}
    </div>

    <div onClick={handleSearch} className="flex items-center justify-between">
      { !disableSearchBtn ? <button
          className="border-slate-900 border-2 px-4 text-lg text-slate-900 hover:bg-slate-900 hover:text-white ease-in-out duration-300"
          type="submit">{loading ? 'Searching...' : 'Search'}</button> 
        : <button disabled
          className="border-slate-900 border-2 px-4 text-lg text-slate-900 hover:bg-slate-900 hover:text-white ease-in-out duration-300"
          type="submit">Search</button> 
      }
      {/* {searchErrorMessage && <p className="text-red-500 text-md">{searchErrorMessage}</p>}  */}
    </div>



    {/* Render results */}
      <ul className='mt-4'>
        {searchResults.length !== 0 ? searchResults.map(result => (
          <div key={result.id}>
            {/* <a href={isValidHref ? href : null}> */}
            <a href={`/post?id=${result.id}`}>
              <div className='flex my-8 items-center'>
                {
                  result.imgHref ? <img className="mr-4 h-10 w-10 rounded-full" src={result.imgHref} alt="Search result" />
                  : <img alt="Post Preview Image" className="mr-4 h-10 w-10 rounded-full" src="https://org.olk1.com/picz/1682816223.jpg" />
                }
                <p className="w-fit text-xl">
                  {DOMPurify.sanitize(result.title)}
                </p>
              </div>
            </a>
          </div>
        )) : (
          formSubmitted && <p>Currently there are no articles with that title.</p>
        )}
      </ul>
    </div>
</>
  );
}

export default Search;
