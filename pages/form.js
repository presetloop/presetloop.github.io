import { useState, useRef, useEffect } from 'react';
import {useRouter} from 'next/router';
import DOMPurify from 'dompurify';
import FormInputs from '@/components/FormInputs';

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
  const [linkErrorMessage, setLinkErrorMessage] = useState("");
  const [imageErrorMessage, setImageErrorMessage] = useState("");
  const [contentErrorMessage, setContentErrorMessage] = useState("");

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
  if (value.match(regex) || value.includes("www.") || value.includes("ww.") || value.includes("w.") || value.includes("w.") || value.includes(".")) {
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


// Submit form after checks
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
  if (linkErrorMessage || imageErrorMessage) {
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
    <FormInputs titleField={titleField} title={title} handleChange={handleChange} titleErrorMessage={titleErrorMessage} handleLinkTagChange={handleLinkTagChange} linkTag={linkTag} linkErrorMessage={linkErrorMessage} imgHref={imgHref} handleImageInputChange={handleImageInputChange} imageErrorMessage={imageErrorMessage} content={content} contentErrorMessage={contentErrorMessage} disableSubmitBtn={disableSubmitBtn} loading={loading} handleSubmit={handleSubmit} />
  );
}

export default MyForm;
