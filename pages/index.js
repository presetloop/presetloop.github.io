import React, { useState, useEffect } from 'react';
import DeleteBtn from '../components/DeleteBtn';

function MyPage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
      const res = await fetch('https://dev.olk1.com/api/');
      const json = await res.json();
      // console.log(json)
      setData(json);
    }

    return (
      
        <div className="max-w-16 w-[95vh] m-auto">
        <a className="block my-4 text-2xl text-blue-700" href="/form">FORM</a>
            <ul>
                {data?.map(item => (
                    <li className="my-2" key={item.id}>
                      <p className="text-xl">{item.title}</p>
                      <p className="text-lg text-slate-700">{item.content}</p>
                      <DeleteBtn id={item.id} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MyPage;


