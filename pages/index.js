import { useState, useEffect, useRef } from 'react';
import { gsap, Power1} from "gsap";
import LogoutBtn from '@/components/LogoutBtn';
import Cookies from 'universal-cookie';

function Home() {
    const cookies = new Cookies();
    const [loggedIn, setLoggedIn] = useState(false);
    
    useEffect(() => {
        if (cookies.get('PHPSESSID')) {
            setLoggedIn(true)
        }
    }, [cookies.get('PHPSESSID')]);

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
        const res = await fetch('https://toot.olk1.com/api/');
        const json = await res.json();

        if (Array.isArray(json)) {
        
          setData(json);

        } else {
          throw new Error("Data is not an array");
        }

        setLoading(false);
      } catch (error) {
        console.log('Print the error:', error)
        setLoading(false);
      }
    }

    return (
      <div ref={element1Ref} className="opacity-10 max-w-[700px] w-[95%] m-auto">       
      
      {!loading ?
        <>
          { loggedIn && 
            <div className='flex gap-2 justify-between'>
            
              <a className="block" href="/form">
                <p className="my-4 text-xl text-blue-700">
                  Toot?
                </p>
              </a>

              <LogoutBtn />
            </div>
          }

          <ul>
            {data?.map(item => (
              <li className="mb-6" key={item.id}>
                
                <a href={loggedIn ? `/post?id=${item.id}` : `/login`}>

                  <p className="bg-slate-200 md:w-fit px-4 p-2 text-xl">{item.title}</p>
                </a>
                <p className="bg-slate-100 border-dashed border-b-4 border-slate-200 px-4 p-1 md:px-4 md:p-2 text-lg text-slate-700" dangerouslySetInnerHTML={{__html: item.content_excerpt+"..."}}></p>
              </li>
            ))}
          </ul>
        </> : <p>Loading...</p>}
  
      </div>
    );
}

export default Home;
