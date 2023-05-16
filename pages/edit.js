import { useState, useEffect, useRef } from 'react';
import {useRouter} from 'next/router';
import axios from 'axios';
import DOMPurify from 'dompurify';
import getSessionData from '@/helpers/getSessionData';
import EditFormInputs from '@/components/EditFormInputs';

function EditPost() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const { id } = router.query;
  const titleField = useRef(null);

  const [data, setData] = useState(null);

  const [title, setTitle] = useState("");
  const [linkTag, setLinkTag] = useState("");
  const [imgHref, setImgHref] = useState("");
  const [content, setContent] = useState("");

  const [titleErrorMessage, setTitleErrorMessage] = useState("");
  const [linkErrorMessage, setLinkErrorMessage] = useState("");
  const [imageErrorMessage, setImageErrorMessage] = useState("");
  const [contentErrorMessage, setContentErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [disableSubmitBtn, setDisableSubmitBtn] = useState(false);

  useEffect(() => {    
    if (id) {
      fetchData();
    }
  }, [id]);

  // To get input autofocus working
  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  }, []);

// Fetch post data from the backend
    async function fetchData(){
      try {
        const sessionData = getSessionData();
        if (!sessionData) {
          router.push('/login');
          return;
        }

      const response = await axios.get(`${apiUrl}/post.php?id=${id}`);
      
      if (!response) {
        throw new Error('No data received from server');
      }
      const responseData = response.data;
      setData(responseData[0]);

      } catch (error) {
        console.error('Error:', error);
      }
    }


// Remove urls from title and content fields
function handleChange(event) {
  const { name, value } = event.target;
  const regex = /((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
  
  // Check if title/content fields contains a URL and render error message
  // if (value.match(regex) || value.includes("www.") || value.includes("ww.") || value.includes("w.") || value.includes("w.") || value.includes(".")) {
  if (value.match(regex) || value.match(/\.\w/i) || value.match(/w{0,3}\.\w/i)) {
    if (name === "Title") {
      setTitleErrorMessage("Titles cannot contain URLs");
      setDisableSubmitBtn(true);
    } else {
      setContentErrorMessage("Content cannot contain URLs");
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

// Check linkTag has a valid URL
const handleLinkTagChange = (e) => {
  const url = e.target.value.trim();
  
  const pattern = /^(https?:\/\/)?[\w\-]+(\.[\w\-]+)+[/#?]?.*$/i;

  if (!pattern.test(url)) {
    setLinkTag(url);
    setLinkErrorMessage('Please enter a valid URL');
    setDisableSubmitBtn(true);
  } else {
    setLinkTag(url);
    setLinkErrorMessage('');
    setDisableSubmitBtn(false);
  }

  if(url === ""){
    setLinkTag("");
    setLinkErrorMessage("");
    setDisableSubmitBtn(false);
  }
};


// Check for chosen image format
const validImageFormats = ['.png', '.jpg', '.gif'];
function handleImageInputChange(event) {
  const url = event.target.value.trim();
  if (url === "") {
    setImgHref("");
    setDisableSubmitBtn(false);
    setImageErrorMessage("");
    return;
  }

  const imageFormat = validImageFormats.some((format) => url.toLowerCase().endsWith(format));

  if (!imageFormat) {
    setImageErrorMessage("Images must be .png, .jpg, or .gif.");
    setImgHref(url);
    setDisableSubmitBtn(true);
  } else {
    setImageErrorMessage("");
    setImgHref(url);
    setDisableSubmitBtn(false);
  }
}


// Convert all links (linkTag and imgHref field) to https (onSubmit)
function addHttpsToLink(linkX) {
  let updatedLink = linkX;
  if (!updatedLink) return;
  // const pattern = /^(htps?:\/\/(ww?\.)*|htp:\/\/(ww?\.)*|http:\/\/(ww?\.)*|w\.)/i;
const pattern = /^(htps?:\/\/(ww?\.)*|htp:\/\/(ww?\.)*|http:\/\/(ww?\.)*|w{1,2}\.)/i;
  if (!linkX.startsWith("https://")) {
    (updatedLink = `https://${linkX.replace(pattern, (match) => {
    if (match.startsWith("w")) {
      return "www.";
    } else {
      return "";
    }
  })}`);
  }
  return updatedLink;
}

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if required fields are filled
  if (!title || !content) {
    setLoading(false);
    setDisableSubmitBtn(true);
    setContentErrorMessage("Please fill in all required fields");
    return;
  }
  
  // Check if there's a link/image error message
  if (linkErrorMessage || imageErrorMessage) {
    setLoading(false);
    setDisableSubmitBtn(true);
    return;
  }

  // Proceed with form submission
  setLoading(true);
  setDisableSubmitBtn(false);
  
  // Send updated post data to the backend  
  const formData = {
    'title': DOMPurify.sanitize(title),
    'linkTag': DOMPurify.sanitize(addHttpsToLink(linkTag)),
    'imgHref': DOMPurify.sanitize(addHttpsToLink(imgHref)),
    'content': DOMPurify.sanitize(content)
  }
  

    try {
    const response = await fetch(`${apiUrl}/edit.php?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    // console.log(response);
    
    setLoading(false);
    // Prevent double tap submit
    setTimeout(() => {
      setDisableSubmitBtn(true);
    }, 3000);
  } catch (error) {
    setLoading(false);
    console.error(error);
  }
  window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/post?id=${id}`;

};

  // Handle case when post data is not yet fetched
  if (data?.title === null || data?.linkTag === null|| data?.imgHref === null|| data?.content === null) {
    return <p className={`text-slate-200 transition-all duration-5000 flex items-center justify-center h-screen -mt-[100px] text-[8vw]`}>Loading...</p>;
  }

  // if (loading) {
  //   return <p className={`text-slate-200 transition-all duration-5000 flex items-center justify-center h-screen -mt-[100px] text-[8vw]`}>Loading...</p>;
  // }

  return (

    <EditFormInputs data={data} titleField={titleField} title={title} handleChange={handleChange} titleErrorMessage={titleErrorMessage} handleLinkTagChange={handleLinkTagChange} linkTag={linkTag} linkErrorMessage={linkErrorMessage} imgHref={imgHref} handleImageInputChange={handleImageInputChange} imageErrorMessage={imageErrorMessage} content={content} contentErrorMessage={contentErrorMessage} disableSubmitBtn={disableSubmitBtn} loading={loading} handleSubmit={handleSubmit} />
  
  );
}

export default EditPost;
