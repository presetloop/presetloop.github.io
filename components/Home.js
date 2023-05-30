import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import HomeListItem from '@/components/HomeListItem';

export default function Home({isAdmin, loggedIn, totalCount }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const targetRef = useRef(null);
  const previousScrollPosition = useRef(0);

  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [postCount, setPostCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(false);
  const [hasMore, setHasMore] = useState(true);

useEffect(() => {
  const storedData = JSON.parse(localStorage.getItem('data'));
  if (storedData && storedData.ids && storedData.page) {
    fetchNewData(1, storedData.page);
    setPage(storedData.page);
  } else {
    fetchNewData();
  }
}, []);

async function fetchNewData(startPage = 1, endPage = startPage) {
  setLoading(true);
  
  previousScrollPosition.current = window.scrollY;

  let allPosts = [];
  const totalPages = endPage - startPage + 1;
  let completedPages = 0;
  try {
    for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
      const response = await axios.get(`${apiUrl}/index.php?page=${pageNumber}`);
      const responseData = response.data;
      const newPosts = responseData.posts;
      setPostCount(responseData.total_count);
      if (newPosts.length === 0) {
        setHasMore(false);
        break;
      } else {
        allPosts = [...allPosts, ...newPosts];
        allPosts.sort((a, b) => a.id - b.id); // sort the allPosts array by ID
        localStorage.setItem('data', JSON.stringify({ ids: allPosts.map(post => post.id), page: pageNumber }));
        setPage(pageNumber);
        if (newPosts.length === 0 || allPosts.length === totalCount) {
          setHasMore(false);
          break;
        }
      }
      completedPages++;
      const percentComplete = Math.ceil(Math.round((completedPages / totalPages) * 10000) / 100);
      setProgress(`${percentComplete}%`);
    }
    
    setData(allPosts.reverse());
    
  } catch (error) {
    console.log('Print the error!!!:', error);
  }
  setProgress(``);
  setLoading(false);
}


function handleFetchArticles(event) {
  event.preventDefault();
  event.stopPropagation();
  const nextPage = page + 1;

  fetchNewData(1, nextPage);
  setTimeout(() => {
    scrollToRef();
  }, 1000);
}

const scrollToRef = () => {
  const scrollToPosition = previousScrollPosition.current + 300;
  window.scrollTo({
    top: scrollToPosition,
    behavior: "smooth",
  });
};

setTimeout(() => {
  if (!data || data.length === 0) {
  return <p className={`text-red-400 transition-all duration-5000 flex items-center justify-center h-screen -mt-[100px] text-[8vw]`}>Loading...</p>;
}
}, 1000);

// loading && <p className={`transition-all duration-5000 flex items-center justify-center h-screen -mt-[100px] text-[8vw]`}>Loading...</p>


  return (
    <>
      
  {progress !== '' ? (
    
    <div className='flex items-end mx-auto sm:justify-center sm:items-center h-screen sm:-mt-[100px]'>
      <p className="text-slate-200 transition-all duration-5000 text-8xl">{progress}</p>
    </div>

  ) : data.length > 0 && (
    
    <div>
      
      <div className="flex justify-end mt-8 text-xl tracking-wide">Sample Sets<span className='inline-block ml-2'>({postCount})</span>
      </div>

    <ul>
    <div
      className="
        loadedAni
        max-w-xl 
        mx-auto 
        grid 
        pt-4 
        gap-x-32
        gap-y-4
        grid-cols-1 
        sm:gap-y-12 
        sm:pt-6 
        sm:grid-cols-2
        sm:max-w-none 
        md:mx-0
        lg:grid-cols-3
        xl:grid-cols-4
        ">
      {data.map(({ id, title, linkTag, imgHref, content_excerpt }) => (
        <HomeListItem key={id} id={id} title={title} contentExcerpt={content_excerpt} linkTag={linkTag} imgHref={imgHref} isAdmin={isAdmin} loggedIn={loggedIn} />
      ))}
    </div>


    {/* LOAD MORE BUTTON */}
      { loading ? null :
        (
        <>
        {data && (
          <div ref={targetRef} className="loadedAni flex justify-center text-xl   mt-16 mb-60">              
            <div onClick={hasMore ? handleFetchArticles : null} className={hasMore ? 'relative cursor-pointer my-0 bg-[#1A0123] px-8 text-lg text-white ease duration-300 hover:bg-[#1a1] hover:scale-105 hover:pl-12 hover:pr-12' : 'hover:bg-[#1A0123] hover:scale-100 hover:pl-8 hover:pr-8'}>
            <p className={!hasMore ? `load-more-btn select-none` : "select-none"}>
              {hasMore ? "Load more..." : "You have reached the end :)"}
            </p>
            </div>
          </div>
        )}
          </>
        )
      }

      </ul>
    </div>
   ) }
    </>
  );
}
