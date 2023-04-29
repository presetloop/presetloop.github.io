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
        setClassName(img.height < 275 ? 'object-fit' : 'max-h-64 w-[700px]');
      };
    }
  }, [imgHref]);

  if (!isLoggedIn) {
    return (
      <a href={DOMPurify.sanitize(`${baseUrl}/login`).replace(/^https?:\/\//i, 'http://')}
         rel="noopener noreferrer">
        <img
          className={`mt-4 cursor-pointer object-cover ${className}`}
          src={
            imgHref &&
            validUrl.isWebUri(imgHref) &&
            DOMPurify.sanitize(imgHref).replace(/^https?:\/\//i, 'https://')
          }
          alt={item?.title || 'No Image Available'}
        />
      </a>
    );
  }

  if (isHomeImg) {
    return (
      <a href={DOMPurify.sanitize(`${baseUrl}/post?id=${id}`).replace(/^https?:\/\//i, 'http://')}
         rel="noopener noreferrer">
        <img
          className={`mt-4 cursor-pointer object-cover ${className}`}
          src={
            imgHref &&
            validUrl.isWebUri(imgHref) &&
            DOMPurify.sanitize(imgHref).replace(/^https?:\/\//i, 'https://')
          }
          alt={item?.title || 'No Image Available'}
        />
      </a>
    );
  }

  return (
    <a href={DOMPurify.sanitize(imgHref).replace(/^https?:\/\//i, 'https://')}
       target="_blank"
       rel="noopener noreferrer">
      <img
        className={`mt-4 cursor-pointer object-cover ${className}`}
        src={
          imgHref &&
          validUrl.isWebUri(imgHref) &&
          DOMPurify.sanitize(imgHref).replace(/^https?:\/\//i, 'https://')
        }
        alt={item?.title || 'No Image Available'}
      />
    </a>
  );
}
