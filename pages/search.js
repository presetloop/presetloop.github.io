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

    <div className="flex justify-end">
      <a className="block my-4 text-xl text-blue-700" href="/">View all</a>
    </div>

    <div className="mb-2">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
        Search
      </label>
      <input
        ref={searchField}
        required
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="title"
        type="text"
        placeholder="Enter a search query"
        name="Title"
        value={searchTerm} 
        onChange={handleInputChange}
      />
      {searchErrorMessage && <p className="text-red-500 text-md">{searchErrorMessage}</p>}
    </div>
    

    <div onClick={handleSearch} className="flex items-center justify-between">
      { !disableSearchBtn ? <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit">{loading ? 'Searching...' : 'Search'}</button> 
        : <button disabled
          className="bg-blue-100 hover:bg-blue-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit">Toot</button> 
      }
      {/* {searchErrorMessage && <p className="text-red-500 text-md">{searchErrorMessage}</p>}  */}
    </div>



    {/* Render results */}
      <ul className='mt-4'>
        {searchResults.map(result => (
          <div key={result.id}>
            {/* <a href={isValidHref ? href : null}> */}
            <a href={`/post?id=${result.id}`} target="_blank">
              <p className="bg-slate-100 w-fit px-4 p-2 md:px-8 md:p-4 mb-4 text-xl">{DOMPurify.sanitize(result.title)}</p>
            </a>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Search;
