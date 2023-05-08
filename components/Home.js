import { useState, useEffect } from 'react';
import axios from 'axios';
import HomeListItem from '@/components/HomeListItem';

export default function Home({loggedIn, totalCount }) {

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('data'));
    if (storedData) {
      setTimeout(() => {
        setData(storedData);
        const lastPage = Math.ceil(storedData.length / 2);
        setPage(lastPage);
      }, 100);
    } else {
      setTimeout(() => {
        fetchNewData();
      }, 100);
    }
  }, []);


  async function fetchNewData(pageNumber = 1) {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/index.php?page=${pageNumber}`);
      const responseData = response.data;
      const newPosts = responseData.posts;
      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        const updatedData = [...data, ...newPosts];
        setData(updatedData);
        localStorage.setItem('data', JSON.stringify(updatedData));
        setPage(pageNumber);
        if (newPosts.length === 0 || data.length + newPosts.length === totalCount) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.log('Print the error:', error);
    }
    setLoading(false);
  }

  function handleFetchArticles(event) {
    event.preventDefault();
    const nextPage = page + 1;
    fetchNewData(nextPage);
  }

loading && <p className={`text-green-400 transition-all duration-5000 flex items-center justify-center h-screen -mt-[100px] text-[8vw]`}>Loading...</p>

  return (
    <div>
      
  {data.length > 0 && (
    
    <div>
    
    <ul>
  
    <div
      className="
        max-w-2xl 
        mx-auto 
        grid 
        pt-4 
        gap-x-6 
        gap-y-4 
        grid-cols-1 
        sm:gap-y-6 
        sm:pt-6 
        sm:grid-cols-2
        lg:mx-0{isLoggedIn} {isLoggedIn}
        lg:max-w-none 
        lg:grid-cols-3">
      {data.map(({ id, title, linkTag, imgHref, content_excerpt }) => (
        <HomeListItem key={id} id={id} title={title} contentExcerpt={content_excerpt} linkTag={linkTag} imgHref={imgHref} loggedIn={loggedIn} />
      ))}
    </div>


    {/* LOAD MORE BUTTON */}
      <div className="flex justify-center text-xl my-16">              
        <div onClick={hasMore ? handleFetchArticles : null} className={hasMore ? 'relative cursor-pointer my-0 bg-[#1A0123] px-8 text-lg text-white ease duration-300 hover:bg-[#1a1] hover:scale-105 hover:pl-12 hover:pr-12' : 'hover:bg-[#1A0123] hover:scale-100 hover:pl-8 hover:pr-8'}>
        <p className={!hasMore ? `load-more-btn select-none` : "select-none"}>
          {hasMore ? "Load more..." : "You have reached the end :)"}
        </p>
        </div>
      </div>

      </ul>
    </div>
   ) }
    </div>
  );
}
