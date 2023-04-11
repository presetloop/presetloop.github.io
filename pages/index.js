import React, { useState, useEffect } from 'react';

function Home() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
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
      <div className="max-w-[700px] w-[95%] m-auto">       
      {!loading ?
        <>
          <a className="block my-4 text-xl text-blue-700" href="/form">Toot?</a>
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
        </>
      : <p>Loading...</p>}

      <p className="mt-3"><a href='/password-reset'>Forgot password?</a></p>
      </div>
    );
}

export default Home;


