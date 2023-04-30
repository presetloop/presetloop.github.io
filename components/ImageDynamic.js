import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import validUrl from 'valid-url';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function ImageDynamic({ item = null, isLoggedIn = false, isHomeImg = false, id }) {
  const [className, setClassName] = useState('');

  const imgHref = item && item.imgHref || item;

  useEffect(() => {
    if (imgHref && validUrl.isWebUri(imgHref)) {
      const img = new Image();
      img.src = imgHref;
      img.onload = () => {
        setClassName(img.height < 275 ? 'object-contain' : 'object-cover');
      };
    }
  }, [imgHref]);

// images when not logged in
  if (!isLoggedIn) {
    return (
      <a href={DOMPurify.sanitize(`${baseUrl}/login`).replace(/^https?:\/\//i, 'http://')}
         rel="noopener noreferrer">
        <img
          className={`mt-4 cursor-pointer ${className} h-[275px] w-[700px]`}
          src={
            imgHref &&
            validUrl.isWebUri(imgHref) &&
            DOMPurify.sanitize(imgHref).replace(/^https?:\/\//i, 'https://')
          }
          loading="lazy"
          alt={item?.title || 'No Image Available'}
        />
      </a>
    );
  }

// home screen index images when logged in
  if (isHomeImg) {
    return (
      <a href={DOMPurify.sanitize(`${baseUrl}/post?id=${id}`).replace(/^https?:\/\//i, 'http://')}
         rel="noopener noreferrer">
        <img
          className={`mt-4 cursor-pointer ${className} h-[275px] w-[700px]`}
          src={
            imgHref &&
            validUrl.isWebUri(imgHref) &&
            DOMPurify.sanitize(imgHref).replace(/^https?:\/\//i, 'https://')
          }
          loading="lazy"
          alt={item?.title || 'No Image Available'}
        />
      </a>
    );
  }
// logged in article images
  return (
    <a href={DOMPurify.sanitize(imgHref).replace(/^https?:\/\//i, 'https://')}
       target="_blank"
       rel="noopener noreferrer">
      <img
        className={`sm:mt-4 rotate-1 cursor-pointer ${className} w-[48rem] max-w-none`}
        src={
          imgHref &&
          validUrl.isWebUri(imgHref) &&
          DOMPurify.sanitize(imgHref).replace(/^https?:\/\//i, 'https://')
        }
        loading="lazy"
        alt={item?.title || 'No Image Available'}
      />
    </a>
  );
}
