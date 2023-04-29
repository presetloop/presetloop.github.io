import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { gsap, Power1 } from 'gsap';
import LogoutBtn from '@/components/LogoutBtn';
import HomeListItem from '@/components/HomeListItem';

export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const element1Ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      element1Ref.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 1, ease: Power1.easeInOut }
    );
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);

    try {
      const response = await axios.get(`${apiUrl}/index.php`);

      if (!response) {
        throw new Error('No data received from server');
      }

      const responseData = response.data;

      const loggedIn = responseData.logged_in && localStorage.getItem('session', `process.env.NEXT_PUBLIC_SESSION`);
      setLoggedIn(loggedIn);
      setData(responseData.posts);

      setLoading(false);
    } catch (error) {
      console.log('Print the error:', error);
      setLoading(false);
    }
  }

  return loggedIn !== undefined ? (
    <div className="mt-8 border-t-2 border-slate-900 max-w-[1473px] w-[95%] m-auto" ref={element1Ref}>
      {loggedIn ? (
        <div className="flex gap-2 justify-between">
          <a className="block" href="/form">
            <p className="mt-1 -rotate-1 bg-[#1A0123] px-12 text-lg text-white hover:pl-10 hover:pr-10">{`${process.env.NEXT_PUBLIC_BRAND}`}</p>
          </a>

          <div className="flex gap-2">
            <a className="block" href="/search">
              <p className="border-slate-900 border-2 -mt-7 px-4 text-lg text-slate-900 hover:bg-slate-900 hover:text-white">Search</p>
            </a>
            <LogoutBtn />
          </div>
        </div>
      ) : (
        <div className="flex gap-2 justify-between">
          <a className="block" href="/login">
            <p className="border-slate-900 border-2 -mt-7 px-4 text-lg text-slate-900 hover:bg-slate-900 hover:text-white">{`${process.env.NEXT_PUBLIC_BRAND}`}</p>
          </a>
          
            <div className="flex gap-2">
            <a className="block" href="/login">
              <p className="border-slate-900 border-2 -mt-7 px-4 text-lg text-slate-900 hover:bg-slate-900 hover:text-white">Login</p>
            </a>
            <a className="block" href="/register">
              <p className="border-slate-900 border-2 -mt-7 px-4 text-lg text-slate-900 hover:bg-slate-900 hover:text-white">Register</p>
            </a>
          </div>
        </div>
      )}

      {/* spacing */}
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-2 gap-y-4 sm:gap-y-6 pt-2 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {data?.map(({ id, title, imgHref, content_excerpt }) => (
          <HomeListItem key={id} id={id} title={title} contentExcerpt={content_excerpt} imgHref={imgHref} loggedIn={loggedIn} />
        ))}
      </div>
    </div>
  ) : (
    <p className='max-w-[1473px] w-[95%] m-auto'>Loading...</p>
  );
}
