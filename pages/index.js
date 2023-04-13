import React, { useState, useEffect, useRef } from 'react';
import { gsap, Power1, Power2} from "gsap";

function Home() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const element1Ref = useRef(null);
    const element2Ref = useRef(null);
    
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
      gsap.fromTo(
        element1Ref.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 1, ease: Power1.easeInOut }
      );
      gsap.fromTo(
        element2Ref.current,
        { opacity: 0 },
        { opacity: 1, duration: 3, ease: Power2.easeInOut }
      );
    }, []);

    async function fetchData() {
      setLoading(true);

      try {
        const res = await fetch('https://toot.olk1.com/api/');
        const json = await res.json();

        json.reverse();
        setData(json);
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
          <a className="block" href="/form">
            <p className="my-4 text-xl text-blue-700">
              Toot?
            </p>
          </a>

          <ul>
            {data?.map(item => (
              <li className="mb-6" key={item.id}>
                <a href={`/post?id=${item.id}`}>
                  <p className="bg-slate-200 md:w-fit px-4 p-2 text-xl">{item.title}</p>
                </a>
                <p className="bg-slate-100 border-dashed border-b-4 border-slate-200 px-4 p-1 md:px-4 md:p-2 text-lg text-slate-700" dangerouslySetInnerHTML={{__html: item.content.slice(0,100)+"..."}}></p>
              </li>
            ))}
          </ul>
        </> : <p>Loading...</p>}

      <p ref={element2Ref} className="mt-3">
        <a href='/password-reset'>Forgot password?</a>
      </p>
  
      </div>
    );
}

export default Home;