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
    return <div>Loading...</div>;
  }

  if (!data || data.length === 0) {
    return <div>No data</div>;
  }

  return (
    <div className="max-w-16 w-[95vh] m-auto">
      <div className='flex gap-2'>
        <a className="block my-4 text-2xl text-blue-700" href="/">Home</a>
        <a className="block my-4 text-2xl text-blue-700" href="/form">Toot?</a>
      </div>
      <ul>
        {data.map(item => (
          <li className="my-2" key={item.id}>
            <p className="bg-slate-200 border-dashed border-l-2 border-indigo-500 w-fit p-1 stext-xl">{item.title}</p>
            <p className="bg-slate-100 border-dashed border-l-2 border-indigo-500 w-fit p-1 text-lg text-slate-700" dangerouslySetInnerHTML={{__html: item.content}}></p>
            <DeleteBtn id={item.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Post;
