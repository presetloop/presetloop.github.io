import React, { useState, useEffect } from 'react';

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
      
        <div>
        <a className="block my-4 text-2xl text-blue-700" href="/form">FORM</a>
            <ul>
                {data?.map(item => (
                    <li className="my-2" key={item.id}>
                      <p className="text-xl">{item.title}</p>
                      <p className="text-slate-700">{item.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MyPage;


