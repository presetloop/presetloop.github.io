import { useState, useRef, useEffect } from 'react';
import {useRouter} from 'next/router'
// import FormComponent from '../components/FormComponent'

function MyForm() {
  const router = useRouter();
  const titleField = useRef();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // to get input autofocus working
  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    const response = await fetch('https://dev.olk1.com/api/form.php', {
      method: 'POST',
      body: formData
    });
    router.push("/")
    // const data = await response.json();
    // console.log(data);
  };

  return (
    <div className="container m-auto">
      {/* <FormComponent handleSubmit={handleSubmit}/> */}

      <form onSubmit={handleSubmit}>
      <div className="mb-4">
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
      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="content">
          Content
        </label>
        <textarea
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          Submit
        </button>
      </div>
    </form>
 
    </div>
    // <form onSubmit={handleSubmit}>
    //   <label>
    //     Title:
    //     <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
    //   </label>
    //   <label>
    //     Content:
    //     <textarea value={content} onChange={(e) => setContent(e.target.value)} />
    //   </label>
    //   <button type="submit">Submit</button>
    // </form>
  );
}

export default MyForm;
