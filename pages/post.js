import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import validUrl from 'valid-url';
import DeleteBtn from '../components/DeleteBtn';
import ImageDynamic from '../components/ImageDynamic';

function Post() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {    
    if (id) {
      fetchData();
    }
  }, [id]);

  async function fetchData() {
    try {
      const res = await fetch(`https://toot.olk1.com/api/post.php?id=${id}`);
      const json = await res.json();
      
      if(!localStorage.getItem("session", "jelli")){
        router.push('/login');
        return;
      }
      
      setData(json);

      setLoading(false);
    } catch (error) {
      console.log('Print the error:', error);
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="max-w-[700px] w-[95%] m-auto">Loading...</div>;
  }

  function handleClick() {
    router.push('/');
  }

  if (!data || data.length === 0) {
    return (
      <div className="max-w-[700px] w-[95%] m-auto">
        <p>Post no longer exists or perhaps it never did?</p>
        <p className="mt-2 text-md text-blue-500 cursor-pointer" onClick={handleClick}>Go back &larr;</p>
      </div>
    );
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
            
            {item.linkTag && (
              <p className="cursor-pointer bg-slate-100 w-fit px-4 p-2 md:px-8 md:p-4 text-xl">
                <a href={
                  item.linkTag &&
                  validUrl.isWebUri(item.linkTag) &&
                  DOMPurify.sanitize(item.linkTag).replace(/^https?:\/\//i, 'https://')} target="_blank" rel="noopener">
                  {item.linkTag.replace(/^https?:\/\//i, '')}
                </a>
              </p>
            )}

            <div className='flex justify-center'>
              {item.imgHref && (
                <ImageDynamic item={item}/>
              )}
            </div>
            
            <p className="bg-slate-50 w-fit mt-4 p-4 md:p-8 md:mb-1 text-lg text-slate-700" dangerouslySetInnerHTML={{__html: item.content}}></p>
            
            <div className="flex justify-start"><DeleteBtn id={item.id} /></div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Post;
