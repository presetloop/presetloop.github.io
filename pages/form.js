import { useState, useRef, useEffect } from 'react';
import {useRouter} from 'next/router';
import DOMPurify from 'dompurify';

function MyForm() {
  const router = useRouter();
  const titleField = useRef(null);

  const [title, setTitle] = useState('');
  const [linkTag, setLinkTag] = useState('');
  const [imgHref, setImgHref] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [disableSubmitBtn, setDisableSubmitBtn] = useState(false);
  const [titleErrorMessage, setTitleErrorMessage] = useState("");
  const [contentErrorMessage, setContentErrorMessage] = useState("");
  const [imageErrorMessage, setImageErrorMessage] = useState("");

  // To get input autofocus working
  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  }, []);


// Remove urls from title and content fields
function handleChange(event) {
  const { name, value } = event.target;
  const regex = /((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
  
  // Check if title/content fields contains a URL and render error message
  if (value.match(regex) || value.includes("www.")) {
    if (name === "Title") {
      setTitleErrorMessage("Titles cannot contain URLs or '.' characters.");
      setDisableSubmitBtn(true);
    } else {
      setContentErrorMessage("Content cannot contain URLs or '.' characters.");
      setDisableSubmitBtn(true);
    }
  } else {
    if (name === "Title") {
      setTitleErrorMessage("");
      setTitle(value);
      setDisableSubmitBtn(false);
    } else {
      setContentErrorMessage("");
      setContent(value);
      setDisableSubmitBtn(false);
    }
  }
}

const validImageFormats = ['.png', '.jpg', '.gif'];
function handleImageInputChange(event) {
  const { value } = event.target;
  if (value === "") {
    setImgHref("");
    setDisableSubmitBtn(false);
    setImageErrorMessage("");
    return;
  }

  const imageFormat = validImageFormats.some((format) => value.toLowerCase().endsWith(format));

  if (!imageFormat) {
    setImageErrorMessage("Images must be .png, .jpg, or .gif.");
    setImgHref(value);
    setDisableSubmitBtn(true);
  } else {
    setImageErrorMessage("");
    setImgHref(value);
    setDisableSubmitBtn(false);
  }
}

// Convert all links (link and image field) to https
 function addHttpsToLink(linkX) {
  let updatedLink = linkX;
  if (!updatedLink) return;
  if (!linkX.startsWith("https://")) {
    const startIndex = linkX.search(/^(ht(p|ps):\/\/|htp:\/\/www\.|htps?:\/\/www\.|http:\/\/|http:\/\/www\.)/i);
    if (startIndex !== -1) {
      updatedLink = `https://${linkX.substring(startIndex).replace(/^(ht(p|ps):\/\/|htp:\/\/www\.|htps?:\/\/www\.|http:\/\/|http:\/\/www\.)/i, "")}`;
    } else {
      updatedLink = `https://${linkX}`;
    }
  }
  return updatedLink;
}


const handleSubmit = async (event) => {
  event.preventDefault();
  
  // Check if required fields are filled
  if (!title || !content) {
    setLoading(false);
    setDisableSubmitBtn(true);
    setContentErrorMessage("Please fill in all required fields");
    return;
  }
  
  // Check if there's an image error message
  if (imageErrorMessage) {
    setLoading(false);
    setDisableSubmitBtn(true);
    return;
  }

  // Proceed with form submission
  setLoading(true);
  setDisableSubmitBtn(false);
  
  const formData = new FormData();
  formData.append('title', DOMPurify.sanitize(title));
  formData.append('linkTag', DOMPurify.sanitize(addHttpsToLink(linkTag)));
  formData.append('imgHref', DOMPurify.sanitize(addHttpsToLink(imgHref)));
  formData.append('content', DOMPurify.sanitize(content));
  
  try {
    const response = await fetch('https://toot.olk1.com/api/form.php', {
      method: 'POST',
      body: formData
    });
    router.push("/");
    // const data = await response.json();
    setLoading(false);
    // Prevent double tap submit
    setTimeout(() => {
      setDisableSubmitBtn(true);
    }, 3000);
  } catch (error) {
    setLoading(false);
    console.error(error);
  }
};

  return (
    <div className="max-w-[700px] w-[95%] m-auto">

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
          name="Title"
          value={title}
          onChange={handleChange}
        />
        {titleErrorMessage && <p className="text-red-500 text-md">{titleErrorMessage}</p>}
      </div>
      
      <div className="mb-2">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="link">
          Link
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          placeholder="Enter a link (optional)"
          value={linkTag}
          onChange={(e) => setLinkTag(e.target.value.trim())}
          />
      </div>
      
      <div className="mb-2">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="image">
          Image
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          placeholder="Enter an external image link (optional)"
          value={imgHref}
          onChange={handleImageInputChange}
        />
        {imageErrorMessage && <p className="text-red-500 text-md">{imageErrorMessage}</p>}
      </div>
      
      <div className="mb-2">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="content">
          Content
        </label>
        <textarea
          required
          className="appearance-none border rounded w-full h-48 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="content"
          placeholder="Enter some content"
          name="Content"
          value={content}
          onChange={handleChange}
        />
        {contentErrorMessage && <p className="text-red-500 text-md">{contentErrorMessage}</p>}
      </div>
      <div className="flex items-center justify-between">
      { !disableSubmitBtn ? <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit">{loading ? 'Tooting...' : 'Toot'}</button> 
        : <button disabled
          className="bg-blue-100 hover:bg-blue-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit">Toot</button> 
      } 
      </div>
    </form>
 
    </div>
  );
}

export default MyForm;
