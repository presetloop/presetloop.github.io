import React, { useState, useEffect } from 'react';
import DeleteBtn from '../components/DeleteBtn';

function MyPage() {
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
                      <p className="bg-slate-200 border-dashed border-l-2 border-indigo-500 w-fit p-1 stext-xl">{item.title}</p>
                      <p className="bg-slate-100 border-dashed border-l-2 border-indigo-500 w-fit p-1 text-lg text-slate-700">{item.content}</p>
                      <DeleteBtn id={item.id} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MyPage;


