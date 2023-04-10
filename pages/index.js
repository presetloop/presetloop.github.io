import React, { useState, useEffect } from 'react';
import DeleteBtn from '../components/DeleteBtn';

function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
      const res = await fetch('https://toot.olk1.com/api/');
      const json = await res.json();

      json.reverse();
      setData(json);
    }

    return (
      
        <div className="max-w-16 w-[95vh] m-auto">
        <a className="block my-4 text-2xl text-blue-700" href="/form">Toot?</a>
            <ul>
                {data?.map(item => (
                  <li className="my-2" key={item.id}>
                    <a href={`/post?id=${item.id}`}>
                      <p className="bg-slate-200 border-dashed border-l-2 border-indigo-500 w-fit p-1 text-xl">{item.title}</p>
                    </a>
                    <p className="bg-slate-100 border-dashed border-l-2 border-indigo-500 w-fit p-1 text-lg text-slate-700" dangerouslySetInnerHTML={{__html: item.content}}></p>
                    <DeleteBtn id={item.id} />
                  </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;


