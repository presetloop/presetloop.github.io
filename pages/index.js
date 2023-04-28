import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { gsap, Power1} from "gsap";
import LogoutBtn from '@/components/LogoutBtn';
import HomeListItem from '@/components/HomeListItem';

export default function Home() {
    const apiUrl = "https://toot.olk1.com/api/";
    const [loggedIn, setLoggedIn] = useState(false);
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

      const loggedIn = responseData.logged_in && localStorage.getItem("session", "jelli");
      loggedIn && setLoggedIn(true);

      setData(responseData.posts);
      
      setLoading(false);
    } catch (error) {
      console.log('Print the error:', error)
      setLoading(false);
    }
  }

  return (
    <div className="max-w-[700px] w-[95%] m-auto" ref={element1Ref}>
      {!loading ? (
        <>
          {loggedIn && (
            <div className="flex gap-2 justify-between">
              <a className="block" href="/form">
                <p className="my-4 text-xl text-blue-700">Toot?</p>
              </a>
              
              <a className="block" href="/search">
                <p className="my-4 text-xl text-blue-700">Search</p>
              </a>
              
              <LogoutBtn />
            </div>
          )}

          {data?.map(({ id, title, content_excerpt }) => (
            <HomeListItem key={id} id={id} title={title} contentExcerpt={content_excerpt} loggedIn={loggedIn} />
          ))}
        </> 
        ) : ( <p>Loading...</p> )
      }
    </div>
  );
};
