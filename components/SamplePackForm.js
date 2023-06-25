import { useState, useRef, useEffect } from 'react';
import {useRouter} from 'next/router';
import {getAdminCookie} from '@/helpers/handleCookies';
import addHttpsToLink from '@/helpers/addHttpsToLink';
import {sanitize} from 'dompurify';
import SamplePackFormInputs from '@/components/SamplePackFormInputs';
import DynamicFormInput from './DynamicFormInput';

function SamplePackForm({apiUrl}) {
  // const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const titleField = useRef(null);

  const [formData, setFormData] = useState(new FormData());

  const [title, setTitle] = useState('');
  const [titleErrorMessage, setTitleErrorMessage] = useState("");
  const [linkTag, setLinkTag] = useState('');
  const [linkErrorMessage, setLinkErrorMessage] = useState("");
  const [imgHref, setImgHref] = useState('');
  const [imageErrorMessage, setImageErrorMessage] = useState("");
  const [info, setInfo] = useState('');
  const [infoErrorMessage, setInfoErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [disableSubmitBtn, setDisableSubmitBtn] = useState(false);

  // If not logged in, redirect.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const getCookie = getAdminCookie();
      if (!getCookie) {
        router.push('/login');
        return;
      } 
    }
  }, []);

  // To get input autofocus working
  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  }, []);


// Remove urls from title and info fields
function handleChange(event) {
  const { name, value } = event.target;
  const regex = /((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
  
  // Check if title/info fields contains a URL and render error message
  // if (value.match(regex) || value.includes("www.") || value.includes("ww.") || value.includes("w.") || value.includes(".")) {
  if (value.match(regex) || value.match(/\.\w/i) || value.match(/w{0,3}\.\w/i)) {
    if (name === "Title") {
      setTitleErrorMessage("Titles cannot contain URLs");
      setDisableSubmitBtn(true);
    } else {
      setInfoErrorMessage("Content cannot contain URLs");
      setDisableSubmitBtn(true);
    }
  } else {
    if (name === "Title") {
      setTitleErrorMessage("");
      setTitle(value);
      setDisableSubmitBtn(false);
    } else {
      setInfoErrorMessage("");
      setInfo(value);
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



// Submit form after checks
const handleSubmit = async (event) => {
  event.preventDefault();
  
  // Check if required fields are filled
  if (!title || !info) {
    setLoading(false);
    setDisableSubmitBtn(true);
    setInfoErrorMessage("Please fill in all required fields");
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
  
  // const formData = new FormData();
  formData.append('title', sanitize(title));
  formData.append('linkTag', sanitize(addHttpsToLink(linkTag)));
  formData.append('imgHref', sanitize(addHttpsToLink(imgHref)));
  formData.append('info', sanitize(info));

  // console.table(formData);
  // return;

  try {
    const response = await fetch(`${apiUrl}/form.php`, {
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
    
    {/* VIEW ALL */}
    <div className="flex justify-end w-full mt-2 sm:mt-0 mb-4 sm:mb-2 border-t-2 border-slate-900">
      <a className="block my-0 bg-[#1A0123] px-12 text-lg text-white ease ease-in-out duration-300 sm:hover:pl-8 sm:hover:pr-8" href="/">View all</a>
    </div>

  <form onSubmit={handleSubmit}>

    <SamplePackFormInputs titleField={titleField} title={title} handleChange={handleChange} titleErrorMessage={titleErrorMessage} handleLinkTagChange={handleLinkTagChange} linkTag={linkTag} linkErrorMessage={linkErrorMessage} imgHref={imgHref} handleImageInputChange={handleImageInputChange} imageErrorMessage={imageErrorMessage} info={info} infoErrorMessage={infoErrorMessage} formData={formData} setFormData={setFormData} />


    <DynamicFormInput dbName="producer" placeholder="Producer (optional)" formData={formData} setFormData={setFormData} />
    
    <DynamicFormInput dbName="genre" placeholder="Genre (optional)" formData={formData} setFormData={setFormData} />

    
    <DynamicFormInput dbName="packPreviewUrl" placeholder="Pack Preview Url (optional)" formData={formData} setFormData={setFormData} />




      {/* SUBMIT BUTTON */}
    <div className="mt-2 flex items-center justify-between">
    { !disableSubmitBtn ? <button
        className="border-slate-900 border-2 sm:hover:bg-slate-900 sm:hover:text-white font-bold py-0 px-4 text-lg focus:outline-none focus:shadow-outline ease-in-out duration-150"
        type="submit">{loading ? 'Uploading...' : 'Upload'}</button> 
      : <button disabled
        className="border-slate-900 border-2 sm:hover:bg-slate-900 sm:hover:text-white font-bold py-0 px-4 text-lg focus:outline-none focus:shadow-outline ease-in-out duration-150"
        type="submit">Upload</button> 
    } 
    </div>

  </form>

</div>
  );
}

export default SamplePackForm;
