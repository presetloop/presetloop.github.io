import { useContext, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import IsGuestContext from '@/helpers/IsGuestContext';
import CountdownTimer from '@/components/CountdownTimer';
import {getAdminCookie} from '@/helpers/handleCookies';
import getSessionData from '@/helpers/getSessionData';
import {sanitize} from 'dompurify';
import Footer from '@/components/Footer';
import validUrl from 'valid-url';

// const baseUrl = 'http://localhost:5000';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function Search() {
  const router = useRouter();
  const { isGuest } = useContext(IsGuestContext);
  const [admin, setAdmin] = useState(false);
  
  const searchField = useRef(null);
  // const [loggedIn, setLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [message, setMessage] = useState("");
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

      const responseData = await response.json();
      setSearchResults(responseData.results);
      setMessage(responseData.message);
      setFormSubmitted(true);
      setLoading(false);
      setSearchTerm("");
      setSearchErrorMessage("")
    } catch (error) {
      setSearchErrorMessage(error);
      setDisableSearchBtn(true);
      setLoading(false);
    }
  };

  const handleInputChange = event => {
    setSearchTerm(event.target.value);
  };

  if (loading) {
    return <p className={`text-slate-200 transition-all duration-5000 flex items-center justify-center h-screen -mt-[100px] text-[20vw]`}>Loading</p>;
  }


return (
<>
    <div className="max-w-[1600px] w-[99%] m-auto min-h-screen flex-1">

{/* navigation */}
    <div className="flex w-full mt-8 sm:mt-10 border-t-2 border-white">
  
    
    
      { isGuest && (
        <div className='relative md:w-full'>
          <div className="z-100 absolute -top-7 left-0 bg-green-50">
            <CountdownTimer />
          </div>
        </div> 
      )}
    

      {isGuest ? (
      <nav className={`w-full flex text-white sm:hover:text-black`}>
        
        <div className='ml-auto -mt-4 lg:-ml-16 lg:mr-auto pl-0 sm:pl-0'>
        <a className="block my-0 bg-white sm:hover:bg-black px-1 sm:px-12 text-lg text-black sm:hover:text-white ease ease-in-out duration-300" href="/">View all</a>
        
        </div>

          <div className='ml-auto'>
            <a href={"/"}>

              <img className="invert -mt-4 h-auto w-16 transition-all ease-in-out duration-1000 cursor-pointer" src="/pl-logo-trans.png" alt="Preset Loop" />
        
            </a>    
          </div>
      </nav>
      ) : (
      <nav className={`w-full flex space-between text-white sm:hover:text-black`}>
        <div>
          <a href={"/"}>

          <img className="invert -mt-4 h-auto w-16 transition-all ease-in-out duration-1000 cursor-pointer" src="/pl-logo-trans.png" alt="Preset Loop" />

        </a>
        </div>

        <div className='ml-auto'>
          <a className="block my-0 bg-white sm:hover:bg-black px-1 sm:px-12 text-lg text-black sm:hover:text-white ease ease-in-out duration-300" href="/">View all</a>
        </div>
      </nav>
      )}
      
    </div>




    <div className="relative mt-8 pl-1 m-auto w-96">
      <input
        ref={searchField}
        required
        className="appearance-none bg-black md:bg-transparent border-slate-900 mb-8 border-b-[1px] w-full py-2 px-0 placeholder:text-white text-white leading-tight focus:outline-none focus:shadow-outline"
        id="title"
        type="text"
        placeholder="Enter a search query"
        name="Title"
        value={searchTerm} 
        onChange={handleInputChange}
      />
      {searchErrorMessage && <p className="absolute px-1 bottom-1 md:bottom-[10px] left-0 mb-0 text-red-500 text-md">{searchErrorMessage}</p>}
    </div>

    <div onClick={handleSearch} className="flex items-center justify-between pl-1 mt-0 m-auto w-96">
      { !disableSearchBtn ? <button
          className="border-white bg-black md:bg-transparent border-2 hover:border-green-300 px-4 text-lg text-white ease-in-out duration-300"
          type="submit">{loading ? 'Searching...' : 'Search'}</button> 
        : <button disabled
          className="border-slate-900 border-2 px-4 text-lg text-slate-900 sm:hover:bg-slate-900 sm:hover:text-white ease-in-out duration-300"
          type="submit">Search</button> 
      }
      {/* {searchErrorMessage && <p className="text-red-500 text-md">{searchErrorMessage}</p>}  */}
    </div>



    {/* Render results */}
      <ul className='mt-4 m-auto w-96 text-white'>
        {searchResults ? (
          searchResults.length !== 0 ? searchResults.map(result => (
          <div key={result.id}>
            {/* <a href={isValidHref ? href : null}> */}
            <a href={`/samplepack?id=${result.id}`}>
              <div className='flex my-8 items-center'>
                {
                  result.imgHref ? <img className="hidden sm:inline-block mr-4 h-10 w-10 rounded-full border-[2px] border-white" src={sanitize(validUrl.isWebUri(result.imgHref))} alt="Search result" />
                  : <img alt="Post Preview Image" className="mr-4 h-10 w-10 rounded-full" src="https://images.presetloops.com/placeholder/1682816223.jpg" />
                }
                <p className="ml-2 sm:ml-0 w-fit text-xl bg-white text-black">
                  {sanitize(result.title)}
                </p>
              </div>
            </a>
          </div>
        )) : (
          formSubmitted && <p>Currently there are no Sample Packs that match your search query. Please try again.</p>
        )
        ) : (
          <h1 className='font-bold text-white'>{message}</h1>
        )}
      </ul>
    </div>


    <div className='mt-auto'>
      <Footer />
    </div>
</>
  );
}

export default Search;
