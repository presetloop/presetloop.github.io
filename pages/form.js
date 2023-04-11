import { useState, useRef, useEffect } from 'react';
import {useRouter} from 'next/router'
// import FormComponent from '../components/FormComponent'

function MyForm() {
  const router = useRouter();
  const titleField = useRef();

  const [title, setTitle] = useState('');
  const [linkTag, setLinkTag] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  // to get input autofocus working
  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  }, []);

  const handleSubmit = async (event) => {
    setLoading(true);
    
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('linkTag', linkTag);
    formData.append('content', content);
    const response = await fetch('https://toot.olk1.com/api/form.php', {
      method: 'POST',
      body: formData
    });
    router.push("/")
    // const data = await response.json();
    // console.log(data);
    setLoading(false);
  };

  return (
    <div className="max-w-[700px] w-[95%] m-auto">
      {/* <FormComponent handleSubmit={handleSubmit}/> */}

      <div className="flex justify-end">
        <a className="block my-4 text-xl text-blue-700" href="/">View all</a>
      </div>
      <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
          Title
        </label>
        <input
          ref={titleField}
          required 
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          placeholder="Enter a title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      
      <div className="mb-2">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
          Link
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          placeholder="Enter a link (optional)"
          value={linkTag}
          onChange={(e) => setLinkTag(e.target.value)}
        />
      </div>
      
      <div className="mb-2">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="content">
          Content
        </label>
        <textarea
          className="appearance-none border rounded w-full h-48 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="content"
          placeholder="Enter some content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {loading ? 'Tooting...' : 'Toot'}
        </button>
      </div>
    </form>
 
    </div>
  );
}

export default MyForm;
