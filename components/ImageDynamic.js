import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import validUrl from 'valid-url';

export default function ImageDynamic({ item }) {
  const [className, setClassName] = useState('');

  useEffect(() => {
    if (item.imgHref && validUrl.isWebUri(item.imgHref)) {
      const img = new Image();
      img.src = item.imgHref;
      img.onload = () => {
        setClassName(img.height < 275 ? 'h-64 w-64' : 'max-h-64 w-[700px]');
      };
    }
  }, [item.imgHref]);

  return (
    <a
      href={
        item.imgHref &&
        validUrl.isWebUri(item.imgHref) &&
        DOMPurify.sanitize(item.imgHref).replace(/^https?:\/\//i, 'https://')
      }
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        className={`mt-4 cursor-pointer object-cover ${className}`}
        src={
          item.imgHref &&
          validUrl.isWebUri(item.imgHref) &&
          DOMPurify.sanitize(item.imgHref).replace(/^https?:\/\//i, 'https://')
        }
        alt={item.title || 'No Image Available'}
      />
    </a>
  );
}
