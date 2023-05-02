import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import validUrl from 'valid-url';
import ImagePlaceholder from '@/components/ImagePlaceholder';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function ImageDynamic({ item = null, isLoggedIn = false, isHomeImg = false, id }) {
  const [className, setClassName] = useState('object-cover');
  
  const convertToHttps = "http://"; // CHANGE to https:// BEFORE BUILD AND DEPLOY
  const imgHref = item && item.imgHref || item;

  useEffect(() => {
    if (imgHref && validUrl.isWebUri(imgHref)) {
      const img = new Image();
      img.src = imgHref;
      img.onload = () => {
        setClassName(img.height < 275 ? 'object-contain' : 'object-cover');
      };
    }
  }, [imgHref, validUrl]);

// images when not logged in (redirects to /login)
  if (!isLoggedIn) {
    return (
      <a href={DOMPurify.sanitize(`${baseUrl}/login`).replace(/^http?:\/\//i, convertToHttps)}
         rel="noopener noreferrer">
        
        { imgHref ? ( 
          <img
            className={`transition-all duration-500 mt-4 cursor-pointer ${className} h-[275px] w-[700px]`}
            src={
              imgHref &&
              validUrl.isWebUri(imgHref) &&
              DOMPurify.sanitize(imgHref).replace(/^http?:\/\//i, convertToHttps)
            }
            loading="lazy"
            alt={item?.title || 'No Image Available'}/>
          ) : (
            <ImagePlaceholder width={"100vw"} className={className} imgkey={Math.random()} height={"275px"} />
          )
        }
      </a>
    );
  }

// home screen index images when logged in (link to post id)
  if (isHomeImg) {
    return (
      <a href={DOMPurify.sanitize(`${baseUrl}/post?id=${id}`).replace(/^http?:\/\//i, convertToHttps)}
         rel="noopener noreferrer">
        
        { imgHref ? ( 
          <img
            className={`mt-4 cursor-pointer ${className} h-[275px] w-[700px]`}
            src={
              imgHref &&
              validUrl.isWebUri(imgHref) &&
              DOMPurify.sanitize(imgHref).replace(/^http?:\/\//i, convertToHttps)
            }
            loading="lazy"
            alt={item?.title || 'No Image Available'}/>
          ) : (
            // remove width prop to keep the placeholder image square
            <ImagePlaceholder className={className} imgkey={Math.random()} height={"275px"} width={"100vw"} />
          )
        }
      </a>
    );
  }

// logged in article images.
  return (
    <a href={DOMPurify.sanitize(imgHref).replace(/^http?:\/\//i, convertToHttps)}
       target="_blank"
       rel="noopener noreferrer">
      
      { !item.imgHref ? (
        <ImagePlaceholder 
          className={`${className} mx-auto`}
          imgkey={Math.random()} 
          height={window.innerWidth < 800 ? "275px" : "770px"}
          rotate={"rotate(1deg)"}
        />
      ) : ( 
      <img
        className={`sm:mt-4 rotate-1 cursor-pointer ${className} md:w-[48rem] max-w-none ${window.innerWidth < 800 ? 'h-[275px] w-[700px]' : ''}`}
        src={
          imgHref &&
          validUrl.isWebUri(imgHref) &&
          DOMPurify.sanitize(imgHref).replace(/^http?:\/\//i, convertToHttps)
        }
        loading="lazy"
        alt={item?.title || 'No Image Available'}
      /> )
      }
    </a>
  );
}