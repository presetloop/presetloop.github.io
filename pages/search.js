import validUrl from 'valid-url';
import DOMPurify from 'dompurify';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

// const baseUrl = 'http://localhost:5000';

function Search() {
  const router = useRouter();
  // const postUrl = `${baseUrl}/post?id=${id}`;
  // const loginUrl = `${baseUrl}/login`;
  // const href = loggedIn ? postUrl : loginUrl;

  // const isValidHref = validUrl.isWebUri(href);

  const searchField = useRef(null);
  // const [loggedIn, setLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchErrorMessage, setSearchErrorMessage] = useState(false);
  const [disableSearchBtn, setDisableSearchBtn] = useState(false);

  // If not logged in, redirect.
  useEffect(() => {    
    if(!localStorage.getItem("session", "jelli")){
        router.push('/login');
        return;
      } 
  }, []);
  
  // Autofocus search field on load
  useEffect(() => {
    if (searchField.current) {
      searchField.current.focus();
    }
  }, []);

  async function handleSearch() {
    if(searchTerm === ""){
      setSearchErrorMessage("Enter a search term above")
      // setDisableSearchBtn(true);
      return;
    }
    setLoading(true);

    try {
      const response = await fetch('https://toot.olk1.com/api/search.php', {
        method: 'POST',
        body: JSON.stringify({ searchTerm }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const results = await response.json();
      // console.log(results)
      setSearchResults(results);
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
    return <div className="max-w-[700px] w-[95%] m-auto">Loading...</div>;
  }

  // function handleClick() {
  //   router.push('/');
  // }

  // if (!searchResults || searchResults.length === 0) {
  //   return (
  //     <div className="max-w-[700px] w-[95%] m-auto">
  //       <p>Post no longer exists or perhaps it never did?</p>
  //       <p className="mt-2 text-md text-blue-500 cursor-pointer" onClick={handleClick}>Go back &larr;</p>
  //     </div>
  //   );
  // }

  return (
    <div className="max-w-[700px] w-[95%] m-auto">

    <div className="flex justify-end w-full border-t-2 border-slate-900">
      <a className="block my-0 bg-[#1A0123] px-12 text-lg text-white ease ease-in-out duration-300 hover:pl-8 hover:pr-8" href="/">View all</a>
    </div>

    <div className="relative">
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
          type="submit">Toot</button> 
      }
      {/* {searchErrorMessage && <p className="text-red-500 text-md">{searchErrorMessage}</p>}  */}
    </div>



    {/* Render results */}
      <ul className='mt-4'>
        {searchResults.map(result => (
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
        ))}
      </ul>
    </div>
  );
}

export default Search;
