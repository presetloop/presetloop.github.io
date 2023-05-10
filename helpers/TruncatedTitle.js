import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import truncateString from './truncateString';
import truncateStringArg from './truncateStringArg';

function getTruncatedTitle(content, windowWidth) {
  const cleanContentExcerpt = DOMPurify.sanitize(content?.replace(/<br\s*\/?>/gi, ''));

if (windowWidth < 640) {
    return truncateStringArg(cleanContentExcerpt,97);
  } else if (windowWidth < 660) {
    return truncateString(cleanContentExcerpt, 20);
  } else if (windowWidth < 690) {
    return truncateString(cleanContentExcerpt, 20);
  } else if (windowWidth < 710) {
    return truncateString(cleanContentExcerpt, 20);
  } else if (windowWidth < 745) {
    return truncateString(cleanContentExcerpt, 24);
  } else if (windowWidth < 1024) {
    return truncateString(cleanContentExcerpt, 25);
  } else if (windowWidth < 1080) {
    return truncateString(cleanContentExcerpt, 21);
  } else if (windowWidth < 1190) {
    return truncateString(cleanContentExcerpt, 20);
  } else if (windowWidth < 1295) {
    return truncateString(cleanContentExcerpt, 24);
  } else if (windowWidth < 1400) {
    return truncateString(cleanContentExcerpt, 32);
  } else if (windowWidth < 1440) {
    return truncateString(cleanContentExcerpt, 34);
  } else if (windowWidth < 1480) {
    return truncateString(cleanContentExcerpt, 36);
  } else if (windowWidth < 1530) {
    return truncateString(cleanContentExcerpt, 36);
  } else {
    return truncateString(cleanContentExcerpt, 38);
  }
}

function TruncatedTitle({ content }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const truncatedTitle = getTruncatedTitle(content, windowWidth);

  return <div>{truncatedTitle}</div>;
}

export default TruncatedTitle;