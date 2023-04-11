import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import DeleteBtn from '../components/DeleteBtn';

function Post() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`https://toot.olk1.com/api/post.php?id=${id}`);
        const json = await res.json();
        json.reverse();
        setData(json);
        setLoading(false);
      } catch (error) {
        console.log('Print the error:', error);
        setLoading(false);
      }
    }

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return <div className="max-w-[700px] w-[95%] m-auto">Loading...</div>;
  }

  if (!data || data.length === 0) {
    return <div className="max-w-[700px] w-[95%] m-auto">No data</div>;
  }

  return (
    <div className="max-w-[700px] w-[95%] m-auto">
      <div className='flex gap-2 justify-between'>
        <a className="block my-4 text-xl text-blue-700" href="/form">Toot?</a>
        <a className="block my-4 text-xl text-blue-700" href="/">View all</a>
      </div>
      <ul>
        {data.map(item => (
          <li className="my-2" key={item.id}>
            
            <p className="bg-slate-100 w-fit px-4 p-2 md:px-8 md:p-4 mb-4 text-xl">{item.title}</p>
            
            {item.linkTag && <p className="bg-slate-100 w-fit p-1 text-xl"><a href={`${item.linkTag}`} target="_blank">{item.linkTag}</a></p>}
            
            <p className="bg-slate-50 w-fit p-4 md:p-8 md:mb-1 text-lg text-slate-700" dangerouslySetInnerHTML={{__html: item.content}}></p>
            
            <div className="flex justify-start"><DeleteBtn id={item.id} /></div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Post;
