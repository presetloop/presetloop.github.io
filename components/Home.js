import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import HomeListItem from '@/components/HomeListItem';

export default function Home({isAdmin, loggedIn, totalCount }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const targetRef = useRef(null);
  const previousScrollPosition = useRef(0);

  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [samplepackCount, setSamplepackCount] = useState(null);
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

  let allSamplepacks = [];
  const totalPages = endPage - startPage + 1;
  let completedPages = 0;
  try {
    for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
      const response = await axios.get(`${apiUrl}/index.php?page=${pageNumber}`);
      const responseData = response.data;
      const newSamplepack = responseData.samplepacks;
      setSamplepackCount(responseData.total_count);
      if (newSamplepack.length === 0) {
        setHasMore(false);
        break;
      } else {
        allSamplepacks = [...allSamplepacks, ...newSamplepack];
        allSamplepacks.sort((a, b) => a.id - b.id); // sort the allSamplepacks array by ID
        localStorage.setItem('data', JSON.stringify({ ids: allSamplepacks.map(samplepack => samplepack.id), page: pageNumber }));
        setPage(pageNumber);
        if (newSamplepack.length === 0 || allSamplepacks.length === totalCount) {
          setHasMore(false);
          break;
        }
      }
      completedPages++;
      const percentComplete = Math.ceil(Math.round((completedPages / totalPages) * 10000) / 100);
      setProgress(`${percentComplete}%`);
    }
    
    setData(allSamplepacks.reverse());
    
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
  const scrollToPosition = previousScrollPosition.current + 0;
  window.scrollTo({
    top: scrollToPosition,
    behavior: "smooth",
  });
};

setTimeout(() => {
  // NO DATA -> loading wont progress to render UI
  if (!data || data.length === 0) {
  return <p className={`text-red-400 transition-all duration-5000 flex items-center justify-center h-screen text-[20vw]`}>Loading</p>;
}
}, 1000);

// loading && <p className={`transition-all duration-5000 flex items-center justify-center h-screen -mt-[100px] text-[8vw]`}>Loading...</p>


  return (
    <>
      
  {progress !== '' ? (
    
    <div className="fixed inset-0 flex items-center justify-center bg-[#101010]">
      <p className="text-white transition-all duration-5000 text-[20vw]">{progress}</p>
    </div>

  ) : data.length > 0 && (
    
    <div>
      
      <div className="loadedAni flex justify-center mt-4 sm:mt-4 tracking-wide">
        <div className='-skew-x-12 bg-[#fff] -mt-3 sm:-mt-4 px-2 sm:py-2 text-black'>
          <div className='total-sample-sets text-sm sm:text-lg'>
            Total Sample Sets<span className='inline-block ml-2'>({samplepackCount})</span>
          </div>
        </div>
      </div>

    <ul>
    <div
      className="
        loadedAni
        max-w-lg 
        ml-[6vw]
        mr-[6vw] 
        grid 
        pt-4 
        gap-x-4
        gap-y-4
        grid-cols-1 
        sm:max-w-none 
        sm:mx-0
        sm:pt-6 
        sm:gap-x-6
        sm:gap-y-4 
        sm:grid-cols-3
        lg:pt-8 
        lg:gap-x-8
        lg:gap-y-4 
        lg:grid-cols-4
        xl:pt-10 
        xl:gap-x-16
        xl:gap-y-4 
        xl:grid-cols-5
        ">
      {data.map(({ id, title, linkTag, imgHref, infoExcerpt, producer, genre, packPreviewUrl }) => (
        <HomeListItem key={id} id={id} title={title} infoExcerpt={infoExcerpt} linkTag={linkTag} imgHref={imgHref} producer={producer} genre={genre} packPreviewUrl={packPreviewUrl} isAdmin={isAdmin} loggedIn={loggedIn} />
      ))}
    </div>


    {/* LOAD MORE BUTTON */}
      { loading ? null :
        (
        <>
        {data && (
          <div ref={targetRef} className="loadedAni flex justify-center text-xl mt-16 mb-60">              
            <div onClick={hasMore ? handleFetchArticles : null} className={hasMore ? 'relative cursor-pointer my-0 bg-[#101010] px-8 text-lg text-white ease duration-300 hover:bg-[#1a1] hover:scale-105 hover:pl-12 hover:pr-12' : 'hover:bg-[#1A0123] hover:scale-100 hover:pl-8 hover:pr-8'}>
            <p className={!hasMore ? `load-more-btn select-none` : "select-none"}>
              {hasMore ? "Load more..." : ""}
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
